// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Corrected import
import './index.css';
import App from './App.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
