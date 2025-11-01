import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Importa os estilos base do Tailwind CSS (essencial para que o CSS funcione)
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
