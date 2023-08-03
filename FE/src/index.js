import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './auth-context/auth-context';
import { BrowserRouter } from 'react-router-dom';
import { CartContextProvider } from './auth-context/cart-context';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
          <CartContextProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </CartContextProvider>
        </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);