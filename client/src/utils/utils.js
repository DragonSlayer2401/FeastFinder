import axios from './axiosConfig';

const verifyJWT = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('/users/verify-jwt', {
    headers: { Authorization: token },
  });
  if (!response.data.authenticated) {
    localStorage.removeItem('token');
  }
  return response.data;
};

export { verifyJWT };
