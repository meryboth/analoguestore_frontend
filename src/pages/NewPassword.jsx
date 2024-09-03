import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function NewPassword() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleNewPassword = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/users/newpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });

    if (response.ok) {
      navigate('/confirmation-new-password');
    } else {
      alert('No se pudo restablecer la contraseña.');
    }
  };

  return (
    <section className='flex justify-center items-center h-screen bg-white'>
      <div className='bg-white p-8 border border-gray-300 w-full sm:w-96'>
        <h1 className='text-3xl font-semibold mb-4'>New Password</h1>
        <form onSubmit={handleNewPassword}>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-black'
            >
              Enter your new password
            </label>
            <p className='text-sm text-gray-600 mb-2'>
              Enter a new password for your account. Make sure it's at least 8
              characters long.
            </p>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='mt-1 p-2 block w-full border border-gray-300 focus:border-black'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-black text-white p-2 hover:bg-gray-800 transition duration-300'
          >
            Reset
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewPassword;
