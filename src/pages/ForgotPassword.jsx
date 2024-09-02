import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/users/resetpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      navigate('/validate-code');
    } else {
      alert('No se pudo enviar el correo de recuperación.');
    }
  };

  return (
    <section className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full sm:w-96'>
        <h1 className='text-3xl font-semibold mb-4'>Restablecer contraseña</h1>
        <form onSubmit={handleForgotPassword}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition duration-300'
          >
            Enviar enlace
          </button>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
