import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import { Provider } from 'react-redux';
import store from './store/index.js';

import './index.css';
import './snow/snow.js';
import './snow/snow.css';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
} else {
  throw new Error("Cannot find root element to bind to");
}
