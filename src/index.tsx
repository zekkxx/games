import './index.css'

import React from 'react';
import Routes from './Routes.js';
import { createRoot } from 'react-dom/client';

// import reportWebVitals from './reportWebVitals.js';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('Root missing from index.html');
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
