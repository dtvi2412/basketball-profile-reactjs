import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCQzv_hW70YQ6RtJM_5d0FE_ItHSHXVe1Y',
  authDomain: 'basketball-profile.firebaseapp.com',
  projectId: 'basketball-profile',
  storageBucket: 'basketball-profile.appspot.com',
  messagingSenderId: '950606153139',
  appId: '1:950606153139:web:c8a35ed919ce1a1211f7c6',
  measurementId: 'G-HPJ5E31B55',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
