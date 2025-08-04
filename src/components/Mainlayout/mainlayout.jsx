import React from 'react';
import { Outlet } from 'react-router-dom';
import Mainnavbar from '../Mainnavbar/mainnavbar'

export default function MainLayout() {
  return (
    <div>
      <Mainnavbar />
      <Outlet />
    </div>
  );
}
