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
    <section className='flex justify-center items-center h-screen bg-white'>
      <div className='bg-white p-8 border border-gray-300 w-full sm:w-96'>
        <h1 className='text-3xl font-semibold mb-4'>Check your email</h1>
        <p>
          A link to reset your password has been sent to your email address.
          Please check your email and enter the validation code below.
        </p>

        <form onSubmit={handleValidateCode}>
          <div className='mb-4'>
            <label
              htmlFor='token'
              className='block text-sm font-medium text-black mt-5'
            >
              Code
            </label>
            <input
              type='text'
              id='token'
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              className='mt-1 p-2 block w-full border border-gray-300 focus:border-black'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-black text-white p-2 hover:bg-gray-800 transition duration-300'
          >
            Validate code
          </button>
        </form>
      </div>
    </section>
  );
}

export default ValidateCode;
