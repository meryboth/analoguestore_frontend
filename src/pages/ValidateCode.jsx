import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ValidateCode() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleValidateCode = async (e) => {
    e.preventDefault();
    navigate(`/new-password?token=${token}`);
  };

  return (
    <section className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full sm:w-96'>
        <h1 className='text-3xl font-semibold mb-4'>Ingresar código</h1>
        <form onSubmit={handleValidateCode}>
          <div className='mb-4'>
            <label
              htmlFor='token'
              className='block text-sm font-medium text-gray-700'
            >
              Código
            </label>
            <input
              type='text'
              id='token'
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              className='mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition duration-300'
          >
            Validar código
          </button>
        </form>
      </div>
    </section>
  );
}

export default ValidateCode;
