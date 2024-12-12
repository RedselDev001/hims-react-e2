import React, { useEffect, useState } from 'react';
import { useAuth } from './authContext';
import { LogOut } from 'react-feather';
import { useLocation } from 'react-router-dom';
import AdmissionSheet from './Admission/AdmissionSheet';
import IpdAdmissionDetails from './Admission/IpdAdmissionDetails';
// import AdmissionSheets from './AdmissionSheets';

function Home() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  const [admissionId, setAdmissionId] = useState(null);

  useEffect(() => {
    // Retrieve admissionId from localStorage
    const storedAdmissionId = localStorage.getItem('admissionId');
    if (storedAdmissionId) {
      setAdmissionId(storedAdmissionId);
    }

    // Check if admissionId is present in the URL
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('admissionId');
    if (id) {
      setAdmissionId(id);
      // Store admissionId in localStorage
      localStorage.setItem('admissionId', id);
    }
  }, [location.search]);

  const buttonStyle = {
    display: isButtonVisible ? 'flex' : 'none', // Control visibility here
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    height: '50px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease',
};

  const handleMouseEnter = (e) => {
    e.target.style.boxShadow = '0px 6px 8px rgba(0, 0, 0, 0.2)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
  };

  const handleLogout = () => {
    localStorage.removeItem('admissionId'); // Clear admissionId on logout
    logout();
  };

  return (
    <>
      <button
     
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleLogout}
      >
        <LogOut />
      </button>
      {/* {admissionId ? (
        <div>
          <h2>Admission ID: {admissionId}</h2>
        </div>
      ) : (
        <div>No Admission ID</div>
      )} */}
      {/* <IpdAdmissionDetails admissionId={admissionId} /> */}
      {/* <AdmissionSheets admissionId={admissionId} /> */}
      <AdmissionSheet />
    </>
  );
}

export default Home;
