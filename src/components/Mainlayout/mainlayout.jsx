import React from 'react';
import { Outlet } from 'react-router-dom';
import Mainnavbar from '../Mainnavbar/mainnavbar'
import Footer from '../Footer/footer';
import WakeBackend from '../Wakebackend/wakebackend';

export default function MainLayout() {
  return (
    <div>
      <WakeBackend />
      <Mainnavbar />
      <Outlet />
      <Footer />
    </div>
  );
}
