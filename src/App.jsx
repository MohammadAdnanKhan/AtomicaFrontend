import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login/login';
import FormPage from './components/Formpage/formpage';
import Dashboard from './components/Dashboard/dashboard';
import Home from './components/Home/home';
import About from './components/About/about';
import Layout from './components/Layout/layout';
import MainLayout from './components/Mainlayout/mainlayout';
import Services from './components/Services/services';
import Contact from './components/Contact/contact';
import Profile from './components/Profile/profile';
import Loginusers from './components/Loginusers/loginusers';
import ChangePassword from './components/ChangeAdminPass/ChangeAdminPass';
import JobsDashboard from './components/Jobsdashboard/jobsdashboard';
import JobsUsers from './components/Jobsusers/jobsusers';

const isAuthenticated = () => localStorage.getItem('isAuth') === 'true';
const isUserAuthenticated = () => localStorage.getItem('userAuth') === 'true';

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/admin/login" replace />;
};

const UserPrivateRoute = ({ element }) => {
  return isUserAuthenticated() ? element : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about-us" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Loginusers />} />
          <Route path="jobs" element={<JobsUsers />} />
          <Route path="profiles" element={<UserPrivateRoute element={<Profile />} />} />
        </Route>

        <Route path="/admin" element={<Layout />}>
          <Route
            index
            element={
              isAuthenticated() ? <Navigate to="dashboard" /> : <Navigate to="login" />
            }
          />
          <Route
            path="login"
            element={isAuthenticated() ? <Navigate to="dashboard" /> : <Login />}
          />
          <Route path="form" element={<PrivateRoute element={<FormPage />} />} />
          <Route path="dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="jobsdashboard" element={<PrivateRoute element={<JobsDashboard />} />} />
          <Route path="change-password" element={<PrivateRoute element={<ChangePassword />} />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}