import React from 'react';

function ConfirmationEmailSent() {
  return (
    <section className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full sm:w-96'>
        <h1 className='text-3xl font-semibold mb-4'>Revisa tu correo</h1>
        <p>
          Se ha enviado un enlace para restablecer tu contraseña a tu correo
          electrónico. Por favor, revisa tu correo y coloca a continuación el
          código de validación.
        </p>
      </div>
    </section>
  );
}

export default ConfirmationEmailSent;
