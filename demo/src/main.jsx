import React from 'react';
import ReactDOM from 'react-dom/client';
import { DemoProvider } from './store/DemoContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <DemoProvider>
    <App />
  </DemoProvider>
);
