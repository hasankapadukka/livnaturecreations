// fix-admin.js
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Helper to parse .env file since we are running as a standalone script
function loadEnv() {
  const envPath = path.join(__dirname, 'frontend', '.env');
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found at:', envPath);
    process.exit(1);
  }
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      process.env[key] = value;
    }
  });
}

loadEnv();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const UID = "M3nhndzPUbVau4NMyrJOTC5np643";
const EMAIL = "ramajeyamrishanthancareer@gmail.com";

async function makeAdmin() {
  console.log("-----------------------------------------");
  console.log("Setting up Admin for Liv Nature Creations");
  console.log("Target Email:", EMAIL);
  console.log("Target UID:", UID);
  console.log("-----------------------------------------");
  
  try {
    await setDoc(doc(db, 'users', UID), {
      email: EMAIL,
      is_admin: true,
      role: 'admin',
      full_name: 'Super Admin',
      status: 'active',
      created_at: new Date(),
      updated_at: new Date()
    }, { merge: true });
    
    console.log("✅ SUCCESS: Administrator privileges granted!");
    console.log("You can now log in at: http://localhost:3000/admin/portal");
  } catch (error) {
    console.error("❌ FAILED:", error.message);
    if (error.code === 'permission-denied') {
      console.log("\nTIP: Make sure your Firestore Rules allow 'write' access temporarily.");
    }
  }
}

makeAdmin();
