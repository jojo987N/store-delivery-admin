import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RestaurantProvider } from './context/RestaurantContext';
import { LoadingProvider } from './context/LoadingContext';
import { AuthProvider } from './context/Auth';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <RestaurantProvider>
      <LoadingProvider>
        <AuthProvider>

          <App />

        </AuthProvider>
      </LoadingProvider>
    </RestaurantProvider>

  </React.StrictMode>
);

 