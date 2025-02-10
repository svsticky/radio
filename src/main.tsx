import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import { Provider } from 'react-redux';
import store from './store/index.js';

import './index.scss';
import './snow.scss';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
  );

  const snowflakeContainer = document.createElement('div');
  document.body.appendChild(snowflakeContainer);

  // Check if the date is between 1st of December and March 1st
  const today = new Date();
  const mm = today.getMonth() + 1;
  const isWinter = mm >= 12 || mm < 3;

  if (isWinter) {
    // Create 200 snowflakes
    for (let i = 0; i < 200; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflakeContainer.appendChild(snowflake);
    }
  }
} else {
  throw new Error('Cannot find root element to bind to');
}
