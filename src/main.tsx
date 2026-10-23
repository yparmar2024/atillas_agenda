import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/base.css';
import { App } from './App';
import './styles/accessibility.css';
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
