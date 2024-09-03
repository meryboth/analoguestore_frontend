import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Register() {
  const { register } = useContext(AuthContext);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ first_name, last_name, email, password, age });
  };

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-64px-64px)]'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 border border-gray-300 w-full max-w-md'
      >
        <h2 className='text-2xl mb-6 font-bold'>Register</h2>
        <div className='mb-4'>
          <label className='block mb-2'>First Name</label>
          <input
            type='text'
            className='border w-full p-3'
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Last Name</label>
          <input
            type='text'
            className='border w-full p-3'
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Email</label>
          <input
            type='email'
            className='border w-full p-3'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Password</label>
          <input
            type='password'
            className='border w-full p-3'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className='block mb-2'>Age</label>
          <input
            type='number'
            className='border w-full p-3'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type='submit' className='bg-black text-white p-3 w-full mb-4'>
          Register
        </button>
        <p className='text-sm text-center'>
          Already have an account?{' '}
          <a href='/login' className='text-black hover:underline font-bold'>
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
