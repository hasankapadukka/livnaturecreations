// seed-categories.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, 'frontend', '.env');
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

const initialCategories = [
  {
    name: 'Pulses & Legumes',
    slug: 'pulses-legumes',
    image_url: 'https://images.unsplash.com/photo-1515942400756-12da6c880e02?auto=format&fit=crop&w=800&q=80',
    product_count_display: '12+ Products'
  },
  {
    name: 'Spices & Herbs',
    slug: 'spices-herbs',
    image_url: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80',
    product_count_display: '25+ Products'
  },
  {
    name: 'Grains & Rice',
    slug: 'grains-rice',
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    product_count_display: '08+ Products'
  },
  {
    name: 'Specialty Foods',
    slug: 'specialty-foods',
    image_url: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80',
    product_count_display: '05+ Products'
  }
];

async function seed() {
  console.log('Seeding initial classifications...');
  try {
    for (const cat of initialCategories) {
      const docRef = await addDoc(collection(db, 'categories'), {
        ...cat,
        created_at: new Date()
      });
      console.log(`✅ Added: ${cat.name} (ID: ${docRef.id})`);
    }
    console.log('\nSUCCESS: All classifications have been integrated.');
  } catch (err) {
    console.error('❌ ERROR:', err.message);
  }
}

seed();
