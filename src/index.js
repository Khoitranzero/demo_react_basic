import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from 'react-router-dom';
//import { UserProvider } from './context/UserContext';
import store from './redux/store';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary/error';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
   
    <BrowserRouter>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
    </BrowserRouter>
  
  </React.StrictMode>
  </Provider>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//npm install --save react-bootstrap@2.2.2 bootstrap@5.1.3 sass@1.49.10 axios@0.26.1 paginate@8.1.2