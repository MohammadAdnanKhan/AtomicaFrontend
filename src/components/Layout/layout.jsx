import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import WakeBackend from '../Wakebackend/wakebackend';

export default function Layout() {
  return (
    <div>
      <WakeBackend />
      <Navbar />
      <Outlet />
    </div>
  );
}

