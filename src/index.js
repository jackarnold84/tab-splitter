import React from 'react';
import ReactDOM from 'react-dom/client';

import './static/index.css';
import './static/custom.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
