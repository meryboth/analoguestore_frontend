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
    <section className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full sm:w-96'>
        <h1 className='text-3xl font-semibold mb-4'>Nueva contraseña</h1>
        <form onSubmit={handleNewPassword}>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Nueva contraseña:
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition duration-300'
          >
            Restablecer
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewPassword;
