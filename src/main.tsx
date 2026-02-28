import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';

// Debug: verificar que el CSS se cargó
console.log('🎨 App iniciando...');

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<ThemeProvider>
<AuthProvider>
<App />
</AuthProvider>
</ThemeProvider>
</React.StrictMode>
);