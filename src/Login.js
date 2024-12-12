import { useEffect } from 'react';
import Live from './Config';  // Adjust the path as necessary

function Login() {
 
  const clientId = 'react-ui-client';
  const redirectUri = `${Live.redirectUri}/login/oauth2/code/react-ui-client-oidc`;
  const authUrl = `${Live.Auth}/oauth2/authorize`;

  const handleLogin = () => {
    const loginUrl = `${authUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=thy.read`;
   
    window.location.href = loginUrl;
  };
  useEffect(() => {
    handleLogin()
  }, []);
  return (
    <div>
     
      <button onClick={handleLogin}></button>
    </div>
  );
}

export default Login;
