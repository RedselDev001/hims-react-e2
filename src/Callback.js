import React, { useEffect } from 'react';
import { useAuth } from './authContext';
import { useNavigate,useLocation  } from 'react-router-dom'; 
import Live from './Config';  // Adjust the path as necessary
import { Spinner } from 'reactstrap';
import useData from './ComponentsErx/DynamicFormContext/DynamicComponent';

function Callback() {

  const { setToken } = useAuth();
  const navigate = useNavigate(); 
  const location = useLocation();
  const fullUrl = window.location.href;
  const {fetchData } = useData();

 
  useEffect(() => {
    const fetchToken = async () => {
 
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state'); // state holds the admissionId or condition
      
      
      if (code) {
        try {
          const credentials = btoa('react-ui-client:react_secret');
          const response = await fetch(`${Live.Auth}/oauth2/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${credentials}`
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: `${Live.redirectUri}/login/oauth2/code/react-ui-client-oidc`,
            }),
          });
  
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to fetch token:', response.status, response.statusText, errorText);
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
       
          const { access_token } = data;
          setToken(access_token);
  
          if (state) {
            // Store admissionId in localStorage
            localStorage.setItem('admissionId', state);
          
            // Determine navigation path using a switch case
            switch (true) {
              case state.includes('new'):
                // Redirect to HomeErx if 'new' is in state
                navigate('/HomeErx');
                break;
          
              case state.includes('view'):
                // Redirect to Pdf page if 'view' is in state
             
                const retrievedData = JSON.parse(localStorage.getItem("id"));
              
                 const encodedId = btoa(retrievedData.id);
                // Navigate with the encrypted id in the URL
                navigate(`/Pdf/${encodedId}`);
              
                break;
          
              default:
                // Default case for admissionSheet
                navigate(`/admissionSheet?admissionId=${state}`);
                break;
            }
          } 
          
          else {
            // Default navigation if state is missing
            navigate('/HomeErx');
          }
          
        } catch (error) {
          console.error('Error fetching access token:', error.message);
        }
      }
    };
  
    fetchToken();
  }, [setToken, navigate]);
  

  return <div> <Spinner color="primary" /></div>;
}

export default Callback;