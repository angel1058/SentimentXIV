import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Core/app';
import { GlobalProvider } from './state/StateProvider.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
    <App />
    </GlobalProvider>
  </React.StrictMode>
);

