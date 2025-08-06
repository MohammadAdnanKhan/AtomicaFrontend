import React from 'react';
import { Outlet } from 'react-router-dom';
import Mainnavbar from '../Mainnavbar/mainnavbar'
import Footer from '../Footer/footer';
export default function MainLayout() {
  return (
    <div>
      <Mainnavbar />
      <Outlet />
      <Footer />
    </div>
  );
}
