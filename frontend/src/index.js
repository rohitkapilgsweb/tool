import React from 'react';
import ReactDOM from 'react-dom/client';
// import './assets/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import store from './redux/store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from './config/config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <>
    <Router >
    <React.StrictMode >
    <Provider store = { store } >
    <GoogleOAuthProvider clientId={GoogleLogin}>
    <App />
    </GoogleOAuthProvider>
    </Provider>
     </React.StrictMode>
      </Router>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();