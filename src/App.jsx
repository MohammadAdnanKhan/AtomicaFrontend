import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/login';
import FormPage from './components/Formpage/formpage';
import Dashboard from './components/Dashboard/dashboard';

const isAuthenticated = () => localStorage.getItem('isAuth') === 'true';

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} />

        <Route path="/form" element={<PrivateRoute element={<FormPage />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
