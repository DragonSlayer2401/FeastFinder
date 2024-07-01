import { Outlet } from 'react-router-dom';
import Home from './Home/Home';
import { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('/users/verify-jwt', {
        headers: { Authorization: token },
      })
      .then((response) => {
        setAuthenticated(response.data.authenticated);

        if (!response.data.authenticated) {
          localStorage.removeItem('token');
          sessionStorage.removeItem('user');
        }
      });
  }, []);
  if (authenticated) {
    return <Outlet />;
  } else {
    return <Home />;
  }
};

export default ProtectedRoute;
