import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import {useNavigate} from 'react-router-dom'

import './index.css';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import { store } from './redux/store';

const AuthHomeWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = localStorage.access_token;
    if (!access_token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return <App />;
};
const AuthLoginWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = localStorage.access_token;
    if (access_token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return <Login />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<AuthLoginWrapper />} />
          <Route path='*' element={<AuthHomeWrapper />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);

