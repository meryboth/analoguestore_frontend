import React from 'react';
import { Link } from 'react-router-dom';

function ConfirmationNewPassword() {
  return (
    <section className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full sm:w-96'>
        <h1 className='text-3xl font-semibold mb-4'>
          ¡Confirmación de nueva contraseña!
        </h1>
        <p>La nueva contraseña se ha guardado correctamente.</p>
        <Link
          to='/login'
          className='w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition duration-300 block text-center'
        >
          Iniciar sesión
        </Link>
      </div>
    </section>
  );
}

export default ConfirmationNewPassword;
