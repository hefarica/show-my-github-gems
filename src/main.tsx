// src/main.tsx
// Punto de entrada principal de React
// Debe incluir:
// - React.StrictMode
// - Renderizado de App
// - Importación de estilos CSS

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
