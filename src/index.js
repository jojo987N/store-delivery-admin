import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StoreProvider } from './context/StoreContext';
import { LoadingProvider } from './context/LoadingContext';
import { AuthProvider } from './context/Auth';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <StoreProvider>
      <LoadingProvider>
        <AuthProvider>

          <App />

        </AuthProvider>
      </LoadingProvider>
    </StoreProvider>

  </React.StrictMode>
);

 