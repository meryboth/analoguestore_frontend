import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchUserData = async (token) => {
  try {
    console.log('Fetching user data with token:', token);
    const response = await fetch(`${BASE_URL}/api/users/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log('User data from backend:', data);
      return data;
    } else {
      console.error('Failed to fetch user data, status:', response.status);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
  return null;
};

function GithubCallback() {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    console.log('Received Token from URL:', token);

    if (token) {
      console.log('Token received:', token);
      localStorage.setItem('jwt', token);

      fetchUserData(token).then((userData) => {
        if (typeof setUser === 'function' && typeof setToken === 'function') {
          setUser(userData);
          setToken(token);
          console.log('User and Token set successfully');
          localStorage.setItem('user', JSON.stringify(userData));
          navigate('/');
        } else {
          console.error('setUser or setToken is not a function');
          navigate('/login');
        }
      });
    } else {
      console.error('No token found in URL');
      navigate('/login');
    }
  }, [navigate, setUser, setToken]);

  return <div>Loading...</div>;
}

export default GithubCallback;
