import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import Results from './components/Results/Results';
import Details from './components/Details/Details';
import ProtectedRoute from './components/ProtectedRoute';
import Settings from './components/Settings/Settings';
import Favorites from './components/Favorites/Favorites';
import { useEffect } from 'react';
import axios from './axiosConfig';

function App() {
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('/users/verify-jwt', {
        headers: { Authorization: token },
      })
      .then((response) => {
        if (!response.data.authenticated) {
          localStorage.removeItem('token');
          sessionStorage.removeItem('user');
        }
      });
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/results" element={<Results />} />
      <Route path="/details" element={<Details />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/settings" element={<Settings />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}

export default App;
