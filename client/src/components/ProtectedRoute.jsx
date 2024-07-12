import { Outlet, useNavigate } from 'react-router-dom';
import Home from './Home/Home';
import { useEffect, useState } from 'react';
import { verifyJWT } from '../utils/utils';

const ProtectedRoute = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { authenticated } = await verifyJWT();
      setUserAuthenticated(authenticated);
      if (!authenticated) {
        navigate('/');
      }
    })();
  }, [navigate]);

  if (userAuthenticated) {
    return <Outlet />;
  } else {
    return <Home />;
  }
};

export default ProtectedRoute;
