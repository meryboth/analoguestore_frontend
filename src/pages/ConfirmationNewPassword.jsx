import React from 'react';
import { Link } from 'react-router-dom';

function ConfirmationNewPassword() {
  return (
    <section className='flex justify-center items-center h-screen bg-white'>
      <div className='bg-white p-8 border border-gray-300 w-full sm:w-96'>
        <h1 className='text-3xl font-semibold mb-4'>
          New Password Confirmation!
        </h1>
        <p>The new password has been successfully saved.</p>
        <Link
          to='/login'
          className='w-full bg-black text-white p-2 hover:bg-gray-800 transition duration-300 block text-center mt-5'
        >
          Log in
        </Link>
      </div>
    </section>
  );
}

export default ConfirmationNewPassword;
