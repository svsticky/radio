import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './snow/snow.js';
import './snow/snow.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
