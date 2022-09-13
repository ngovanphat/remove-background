import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import firebaseConfig from '@/config/firebase'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
