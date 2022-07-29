import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import Provider from './providers/Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));

// A provider is created to share the Context to all components
root.render(
  <Provider>
    <App />
  </Provider>
);
