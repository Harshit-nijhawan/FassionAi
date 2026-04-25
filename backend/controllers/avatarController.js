// avatarController.js
// Yahan AI avatar aur virtual try-on ki logic hai

const { Client, handle_file } = require('@gradio/client')
const path = require('path')
const fs = require('fs')

// ── PHOTO UPLOAD + AVATAR GENERATE ──────────────────────────
const generateAvatar = async (req, res) => {
  try {
    // req.file = multer ne jo photo upload ki uski info
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Photo upload karo!'
      })
    }

    // Uploaded photo ki local path for Gradio (since HF servers can't read localhost URL)
    const localPhotoPath = path.resolve(req.file.path);
    const photoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

    console.log('Photo upload ho gayi, file path:', localPhotoPath)
    console.log('Gradio (Free Hugging Face) se avatar generate ho raha hai...')

    // Connect to free TencentARC/PhotoMaker space with Token
    const app = await Client.connect("TencentARC/PhotoMaker", { 
      hf_token: process.env.HF_TOKEN, 
      token: process.env.HF_TOKEN 
    });
    
    const output = await app.predict("/generate_image", [
      [handle_file(localPhotoPath)], // upload_images
      "A photo of a person img, high quality, realistic, full body", // prompt
      "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry", // negative_prompt
      "Photographic (Default)", // style_name
      50, // num_steps
      20, // style_strength_ratio
      1,  // num_outputs
      5,  // guidance_scale
      0   // seed
    ]);

    // Log the structure for debugging. Usually output[0] holds the gallery images array
    console.log('Gradio Response:', JSON.stringify(output, null, 2));
    
    // Extract the image URL from output.data[0]
    let avatarUrl = photoUrl;
    if (output && output.data && output.data[0] && output.data[0].length > 0 && output.data[0][0].image) {
        avatarUrl = output.data[0][0].image.url;
    } else if (output && output.data && output.data[0] && output.data[0].url) {
        avatarUrl = output.data[0].url;
    }

    console.log('Avatar ban gaya:', avatarUrl)

    res.json({
      success: true,
      message: 'Avatar ban gaya! 🎉',
      avatarUrl,
      originalPhotoUrl: photoUrl
    })

  } catch (error) {
    console.error('Avatar generation error:', error)
    res.status(500).json({
      success: false,
      message: 'Avatar banane mein error aaya: ' + error.message
    })
  }
}

// Helper to resolve localhost URLs to local paths so Hugging Face can access them
const getAccessibleFile = (fileUrl) => {
  if (fileUrl.includes('localhost') || fileUrl.includes('127.0.0.1')) {
    const filename = fileUrl.split('/uploads/')[1];
    if (filename) return path.resolve(__dirname, '..', 'uploads', filename);
  }
  return fileUrl;
}

// ── VIRTUAL TRY-ON ───────────────────────────────────────────
const virtualTryOn = async (req, res) => {
  try {
    const { avatarUrl, clothingUrl } = req.body

    if (!avatarUrl || !clothingUrl) {
      return res.status(400).json({
        success: false,
        message: 'Avatar aur kapde ki photo dono chahiye!'
      })
    }

    console.log('Virtual try-on start ho raha hai (Using Gradio)...')

    const safeAvatar = getAccessibleFile(avatarUrl);
    const safeClothing = getAccessibleFile(clothingUrl);

    // Connect to free IDM-VTON space with Token
    const app = await Client.connect("yisol/IDM-VTON", { 
      hf_token: process.env.HF_TOKEN, 
      token: process.env.HF_TOKEN 
    });
    
    // In IDM-VTON Gradio: dict structure may need to just be the image file directly if Dict is failing
    const output = await app.predict("/tryon", [
      {
        background: handle_file(safeAvatar),
        layers: [],
        composite: null
      },
      handle_file(safeClothing), // garm_img
      "A clothing item", // garment_des
      true, // is_checked
      true, // is_checked_crop
      30, // denoise_steps
      42 // seed
    ]);

    console.log('Try-on output:', JSON.stringify(output, null, 2));

    // Output structure is generally [ resultImageUrl, maskedImageUrl ] or object
    let resultUrl = avatarUrl;
    if (output && output.data && output.data[0] && output.data[0].url) {
        resultUrl = output.data[0].url;
    } else if (output && output[0] && output[0].url) {
        resultUrl = output[0].url;
    }

    console.log('Try-on complete:', resultUrl)

    res.json({
      success: true,
      message: 'Kapda pehen liya avatar ne! 👕',
      resultUrl
    })

  } catch (error) {
    console.error('Try-on error:', error)
    res.status(500).json({
      success: false,
      message: 'Try-on mein error: ' + error.message
    })
  }
}

// ── APNA KAPDA UPLOAD ────────────────────────────────────────
const uploadMyCloth = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Kapde ki photo upload karo!'
      })
    }

    const clothUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

    res.json({
      success: true,
      message: 'Kapda upload ho gaya!',
      clothUrl
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { generateAvatar, virtualTryOn, uploadMyCloth }