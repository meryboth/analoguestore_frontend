import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const { user, totalItems, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <nav className='flex justify-between items-center bg-zinc-950 p-4 text-white'>
        <div className='flex space-x-4'>
          <svg
            width='24px'
            height='24px'
            stroke-width='1.1'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            color='#FFFF'
          >
            <path
              d='M12 7V17'
              stroke='#FFFFFF'
              stroke-width='1.1'
              stroke-linecap='round'
              stroke-linejoin='round'
            ></path>
            <path
              d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
              stroke='#FFFFFF'
              stroke-width='1.1'
              stroke-linecap='round'
              stroke-linejoin='round'
            ></path>
          </svg>
          <Link to='/' className='hover:text-gray-300'>
            Home
          </Link>
          <Link to='/shop' className='hover:text-gray-300'>
            Shop
          </Link>
          <Link to='/chat' className='hover:text-gray-300'>
            Chat
          </Link>
        </div>
        <div className='flex items-center space-x-4'>
          <Link to='/login' className='hover:text-gray-300'>
            Login
          </Link>
          <Link to='/register' className='hover:text-gray-300'>
            Register
          </Link>
        </div>
      </nav>
    );
  }

  const renderLinks = () => {
    switch (user.role) {
      case 'admin':
        return (
          <>
            <Link to='/new-product' className='hover:text-gray-300'>
              New Product
            </Link>
            <Link to='/orders' className='hover:text-gray-300'>
              Orders
            </Link>
            <Link to='/users' className='hover:text-gray-300'>
              Users
            </Link>
          </>
        );
      case 'premium':
        return (
          <>
            <Link to='/new-product' className='hover:text-gray-300'>
              New Product
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className='flex justify-between items-center bg-zinc-950 p-4 text-white'>
      <div className='flex items-center space-x-4'>
        <svg
          width='24px'
          height='24px'
          stroke-width='1.1'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          color='#FFFF'
        >
          <path
            d='M12 7V17'
            stroke='#FFFFFF'
            stroke-width='1.1'
            stroke-linecap='round'
            stroke-linejoin='round'
          ></path>
          <path
            d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
            stroke='#FFFFFF'
            stroke-width='1.1'
            stroke-linecap='round'
            stroke-linejoin='round'
          ></path>
        </svg>
        <Link to='/' className='hover:text-gray-300'>
          Home
        </Link>
        <Link to='/shop' className='hover:text-gray-300'>
          Shop
        </Link>
        <Link to='/chat' className='hover:text-gray-300'>
          Chat
        </Link>
        {renderLinks()}
      </div>
      <div className='flex items-center space-x-4'>
        <div className='flex'>
          <Link to='/cart' className='hover:text-gray-300'>
            <svg
              width='24px'
              height='24px'
              stroke-width='1.1'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              color='#FFFFFF'
            >
              <path
                d='M19.2609 9.69589L20.6455 18.6959C20.8319 19.9074 19.8945 21 18.6688 21H5.33122C4.10545 21 3.16809 19.9074 3.35448 18.6959L4.73909 9.69589C4.8892 8.72022 5.7287 8 6.71584 8H17.2842C18.2713 8 19.1108 8.72022 19.2609 9.69589Z'
                stroke='#FFFFFF'
                stroke-width='1.1'
                stroke-linecap='round'
                stroke-linejoin='round'
              ></path>
              <path
                d='M14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5'
                stroke='#FFFFFF'
                stroke-width='1.1'
                stroke-linecap='round'
                stroke-linejoin='round'
              ></path>
            </svg>
          </Link>
          <p className='mx-2'>{totalItems}</p>
          <span className='mx-2'>{user.first_name}</span>
        </div>
        <button onClick={logout} className='hover:text-gray-300'>
          <svg
            width='24px'
            height='24px'
            stroke-width='1.1'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            color='#FFFFFF'
          >
            <path
              d='M8 12H16M16 12L12.5 8.5M16 12L12.5 15.5'
              stroke='#FFFFFF'
              stroke-width='1.1'
              stroke-linecap='round'
              stroke-linejoin='round'
            ></path>
            <path
              d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
              stroke='#FFFFFF'
              stroke-width='1.1'
              stroke-linecap='round'
              stroke-linejoin='round'
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
