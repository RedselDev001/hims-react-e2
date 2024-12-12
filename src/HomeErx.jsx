// Home.js
import React from 'react';
import { useAuth } from './authContext';

import { useLocation } from 'react-router-dom';
import FromMap from "./ComponentsErx/FormMap"

function HomeErx() {
  const { logout } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appointmentId = queryParams.get('id');
  localStorage.setItem("id", appointmentId);

  return (
    <>
     <FromMap/>
    </>
  );
}

export default HomeErx;
