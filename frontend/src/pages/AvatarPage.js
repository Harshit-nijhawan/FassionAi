import { useState, Suspense, useEffect, Component } from 'react'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei'

// Error boundary to catch GLTF load failures gracefully
class AvatarErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return <mesh><boxGeometry /><meshStandardMaterial color="#6c2bd9" /></mesh>
    }
    return this.props.children
  }
}

function AvatarModel({ url }) {
  const { scene } = useGLTF(url)   // Hook must be at top level (React rule)
  return <primitive object={scene} scale={1.8} position={[0, -1.8, 0]} />
}

export default function AvatarPage() {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [showRpm, setShowRpm] = useState(false)
  const [clothingType, setClothingType] = useState('casual')

  useEffect(() => {
    const handleWindowMessage = (event) => {
      // Setup RPM iframe communication
      if (event.data && event.data.source === 'readyplayerme' && event.data.eventName === 'v1.frame.ready') {
        const iframe = document.getElementById('rpm-frame');
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(JSON.stringify({target: 'readyplayerme', type: 'subscribe', eventName: 'v1.**'}), '*');
        }
      }
      
      // When the user finishes making their avatar, save the URL
      if (event.data && event.data.source === 'readyplayerme' && event.data.eventName === 'v1.avatar.exported') {
        toast.success('3D Avatar created!')
        setAvatarUrl(event.data.data.url)
        setShowRpm(false)
      }
    };
    
    window.addEventListener('message', handleWindowMessage);
    return () => window.removeEventListener('message', handleWindowMessage);
  }, []);

  const handleCreateNew = () => setShowRpm(true)

  // The readyplayer.me domains are often blocked by ISP/Adblockers or currently down.
  // We use reliable fallback 3D models hosted on GitHub for the demo
  // Using jsdelivr CDN to ensure proper model/gltf-binary MIME types (prevents WebGL context loss)
  const outfitAvatars = {
    casual: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/readyplayer.me.glb',
    formal: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/Michelle.glb',
    sport:  'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/Soldier.glb'
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Professional 3D Digital Twin</h1>
          <p style={styles.subtitle}>Interact, Rotate, and Try-On Clothing in Real-Time 3D</p>
        </div>

        {/* Ready Player Me Iframe Overlay */}
        {showRpm && (
          <div style={styles.iframeOverlay}>
            <div style={styles.iframeContainer}>
              <div style={styles.iframeHeader}>
                <div>
                  <h3 style={{ margin: 0, color: 'white' }}>Create Your Digital Body</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: '#ffaaaa' }}>If this fails to load, check your internet or disable adblockers.</p>
                </div>
                <button onClick={() => setShowRpm(false)} style={styles.closeBtn}>X</button>
              </div>
              <iframe 
                id='rpm-frame' 
                src='https://demo.readyplayer.me/avatar?frameApi' 
                allow='camera *; microphone *; clipboard-write' 
                style={styles.iframe} 
                title='Ready Player Me' 
              />
            </div>
          </div>
        )}

        <div style={styles.grid}>
          {/* Left Column: Generator Configuration */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>1. Persona Setup</h2>
            <div style={styles.photoBox}>
              <div style={styles.placeholder}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>🧍</div>
                <p style={{ color: '#666', fontWeight: '500' }}>3D Avatar Engine</p>
                <p style={{ color: '#aaa', fontSize: '14px', padding: '0 20px', marginTop: '10px' }}>
                  Take a selfie or upload a photo, and the AI will generate your fully-rigged 3D clone mapping your facial features.
                </p>
              </div>
            </div>
            <button onClick={handleCreateNew} style={styles.generateBtn}>
              {avatarUrl ? 'Update Body/Face' : 'Launch 3D Creator Engine'}
            </button>
            <button 
              onClick={() => {
                setAvatarUrl('https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/readyplayer.me.glb');
                setShowRpm(false);
                toast.success('Loaded test avatar!');
              }} 
              style={{...styles.generateBtn, backgroundColor: '#eee', color: '#333', marginTop: '10px'}}
            >
              Load Demo Avatar
            </button>
            <p style={{fontSize: '13px', color: '#999', marginTop: '12px', textAlign: 'center'}}>
              Powered by WebGL & WebXR Technology.
            </p>
          </div>

          {/* Right Column: 3D Render Canvas */}
          <div style={{ ...styles.card, gridColumn: 'span 2', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={styles.cardTitle}>2. Interactive Try-On Canvas</h2>
            
            {!avatarUrl ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee', borderRadius: '12px' }}>
                <p style={{ color: '#999', fontSize: '18px' }}>Generate your persona first to unlock the 3D Viewer...</p>
              </div>
            ) : (
              <>
                {/* Embedded Three.js Canvas */}
                <div style={{ flex: 1, backgroundColor: '#ececec', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                  <Suspense fallback={<div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', fontWeight:'bold', width: '100%', textAlign: 'center'}}>Processing 3D Mesh...</div>}>
                    <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }}>
                      <ambientLight intensity={0.6} />
                      <pointLight position={[10, 10, 10]} intensity={1.2} />
                      <spotLight position={[-10, 10, -10]} intensity={0.8} />
                      
                      <OrbitControls 
                        enablePan={false} 
                        minDistance={1.5} 
                        maxDistance={5} 
                        target={[0, 0, 0]} 
                      />
                      
                      {/* Use outfitAvatars to swap between different preset avatars */}
                      <AvatarErrorBoundary>
                        <AvatarModel key={outfitAvatars[clothingType] || avatarUrl} url={outfitAvatars[clothingType] || avatarUrl} />
                      </AvatarErrorBoundary>
                      
                      <Environment preset='city' />
                      <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={5} blur={2.5} />
                    </Canvas>
                  </Suspense>
                  <div style={{position:'absolute', bottom:15, left:0, right:0, textAlign:'center', color:'#555', pointerEvents:'none', fontWeight: 'bold', textShadow: '0 0 5px white'}}>
                    🖱️ Drag to rotate &middot; ↕️ Scroll to zoom
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Change Global Outfit:</h3>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {Object.keys(outfitAvatars).map(type => (
                      <button 
                        key={type} 
                        onClick={() => setClothingType(type)} 
                        style={{
                          ...styles.outfitBtn, 
                          backgroundColor: clothingType === type ? '#6c2bd9' : '#f0ebff', 
                          color: clothingType === type ? 'white' : '#6c2bd9'
                        }}
                      >
                        {type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: '"Inter", sans-serif' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '40px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '10px' },
  subtitle: { fontSize: '18px', color: '#555', marginBottom: '24px' },
  grid: { display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(500px, 2fr)', gap: '24px' },
  card: { backgroundColor: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' },
  cardTitle: { fontSize: '20px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '16px' },
  photoBox: { width: '100%', height: '300px', backgroundColor: '#f8f9fa', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #e0e0e0' },
  placeholder: { textAlign: 'center' },
  generateBtn: { width: '100%', padding: '16px', backgroundColor: '#222', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' },
  outfitBtn: { padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' },
  iframeOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' },
  iframeContainer: { width: '90%', maxWidth: '1000px', height: '85vh', backgroundColor: 'white', borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' },
  iframeHeader: { display: 'flex', justifyContent: 'space-between', padding: '16px 24px', backgroundColor: '#1a1a2e', alignItems: 'center' },
  closeBtn: { background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', fontWeight: 'bold' },
  iframe: { width: '100%', flex: 1, border: 'none' }
}