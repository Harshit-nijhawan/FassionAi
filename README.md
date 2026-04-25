<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />

  <h1>✨ FashionAI Store ✨</h1>
  <p><strong>A Next-Generation E-Commerce & 3D Virtual Try-On Experience</strong></p>
</div>

<br />

## 📖 About the Project

**FashionAI Store** is a full-stack MERN (MongoDB, Express, React, Node) application that revolutionizes online shopping. Rather than just looking at flat images, users can interact with a cutting-edge **3D Digital Twin Environment**. Powered by `React Three Fiber`, `Three.js`, and the `Ready Player Me` ecosystem, users can generate their own 3D persona from a selfie or load rigged human models to preview clothing dynamically in real-time.

## 🚀 Key Features

* 🛍️ **Full E-Commerce Capabilities**: Browse products, view detailed specifications, and manage a fully dynamic shopping cart with price calculations.
* 🔐 **Secure Authentication**: Robust user registration, login, and protected routes handled securely via JWT (JSON Web Tokens) and bcrypt.
* 🧍 **3D Digital Twin Engine**: Users can seamlessly load fully-rigged WebGL 3D models directly in the browser without any plugins.
* 🪄 **Virtual Outfit Switching**: Instantly swap the global 3D model's outfits (Casual, Formal, Sport) dynamically inside the Interactive Try-On Canvas.
* 🛡️ **Error Resilient**: Includes robust fallback mechanisms, such as React Error Boundaries, to ensure 3D contexts never crash the application.

## 💻 Tech Stack

**Frontend:**
* React.js
* `@react-three/fiber` & `@react-three/drei` (WebGL 3D Rendering)
* React Hot Toast (Notifications)
* Custom CSS Glassmorphism & UI

**Backend:**
* Node.js & Express
* MongoDB & Mongoose (Database)
* JSON Web Tokens (JWT Auth)
* Multer (File Handling)

## 🛠️ Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) installed on your machine. You will also need a free MongoDB cluster (or local instance).

### 1. Clone the Repository
```bash
git clone https://github.com/Harshit-nijhawan/FassionAi.git
cd FassionAi
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder and add your environment variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Start the React development server:
```bash
npm start
```

## 🎮 How to use the 3D Try-On
1. Navigate to the **"Try On AI 🪄"** tab in the navigation bar.
2. Click **Launch 3D Creator Engine** to build your own persona, or click **Load Demo Avatar** to load a default human model.
3. Once the WebGL canvas initializes, use your mouse to **drag and rotate** the model, and scroll to **zoom**.
4. Use the purple buttons below the canvas to instantly switch the model's outfit!

<br />

<div align="center">
  <p>Built with ❤️ by Harshit Nijhawan</p>
</div>
