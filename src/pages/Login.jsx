import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });

    const redirectTo = location.state?.from || '/';
    navigate(redirectTo);
  };

  const handleGithubLogin = () => {
    window.location.href = `${BASE_URL}/api/sessions/github`;
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <form onSubmit={handleLogin} className='bg-white p-6 rounded shadow-md'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded w-full mb-2'
        >
          Login
        </button>
        <button
          type='button'
          onClick={handleGithubLogin}
          className='bg-gray-800 text-white p-2 rounded w-full'
        >
          Login with GitHub
        </button>
        <button
          type='button'
          onClick={handleForgotPassword}
          className='text-sm text-blue-500 mt-4'
        >
          ¿Olvidaste tu contraseña?
        </button>
      </form>
    </div>
  );
}

export default Login;
