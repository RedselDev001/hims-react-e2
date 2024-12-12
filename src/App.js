import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './authContext';
import Login from './Login';
import Callback from './Callback';
import Home from './Home';
import HomeErx from './HomeErx';
import PrivateRoute from './CheckToken';
import ErxList from './ComponentsErx/ErxList/ErxList'
import Pdf from "./ComponentsErx/ErxList/pdf"
import './App.css';
import Config from "../src/Config"
function App() {

useEffect(() => {
    const detectDevTools = () => {
        const baseUrl = `${Config.redirectUri}`;
        const threshold = 160; // Adjust based on DevTools size.
        const isDevToolsOpen =
            window.outerWidth - window.innerWidth > threshold || 
            window.outerHeight - window.innerHeight > threshold;

        // Check if the current URL matches the base path
        if (
            isDevToolsOpen && 
            window.location.href.startsWith(baseUrl)
        ) {
            // Redirect to a specific URL
            window.location.href = `${Config.Auth}`;
        }
    };

    const interval = setInterval(detectDevTools, 500); // Check every 500ms.

    return () => clearInterval(interval);
}, []);


  
  return (
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login/oauth2/code/react-ui-client-oidc" element={<Callback />} />
          <Route path="/admissionSheet" element={<PrivateRoute element={Home} />} />
          <Route path="/HomeErx" element={<PrivateRoute element={HomeErx} />} />
          <Route path="/ErxList" element={<PrivateRoute element={ErxList} />} />
          <Route path="/Pdf/:id"      element={<PrivateRoute element={Pdf} />}  />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;