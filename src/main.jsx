import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import App from './App';
import GoogleAnalytics from './components/GoogleAnalytics';
import GoogleTagManager from './components/GoogleTagManager';
import FacebookPixel from './components/FacebookPixel';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <App />
    <GoogleAnalytics />
    <GoogleTagManager />
    <FacebookPixel />
    <Analytics />
  </BrowserRouter>,
);
