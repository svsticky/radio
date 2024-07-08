import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import {Provider} from 'react-redux';
import store from './store';

import './index.css';
import './snow/snow.js';
import './snow/snow.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
