const admin = require('firebase-admin');
require('dotenv').config();

try {
  // Initialize Firebase Admin SDK
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });

  console.log('Firebase connected successfully!'); // This will log if Firebase is initialized correctly
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
}

module.exports = admin.firestore();
