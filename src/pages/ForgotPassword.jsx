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
    <section className='flex justify-center items-center h-[calc(100vh-8rem)] bg-white'>
      <div className='bg-white p-8 w-full sm:w-96 border border-gray-300'>
        <h1 className='text-3xl font-semibold mb-4'>Reset Password</h1>
        <form onSubmit={handleForgotPassword}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-black'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='mt-1 p-2 block w-full border-black focus:border-black'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-black text-white p-2 hover:bg-gray-800 transition duration-300'
          >
            Send Link
          </button>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
