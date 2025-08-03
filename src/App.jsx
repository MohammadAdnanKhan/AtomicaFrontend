import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login/login';
import FormPage from './components/Formpage/formpage';
import Dashboard from './components/Dashboard/dashboard';
import Home from './components/Home/home';
import About from './components/About/about';
import Layout from './components/Layout/layout'

const isAuthenticated = () => localStorage.getItem('isAuth') === 'true';

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/admin/login" replace />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<About />} />

        <Route path="/admin" element={<Layout />}>
          <Route
            index
            element={
              isAuthenticated() ? (
                <Navigate to="dashboard" />
              ) : (
                <Navigate to="login" />
              )
            }
          />
          <Route
            path="login"
            element={
              isAuthenticated() ? <Navigate to="dashboard" /> : <Login />
            }
          />
          <Route path="form" element={<PrivateRoute element={<FormPage />} />} />
          <Route path="dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        </Route>

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}
