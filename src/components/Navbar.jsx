import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const { user, totalItems, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <nav className='flex justify-between items-center bg-gray-800 p-4 text-white'>
        <div className='flex space-x-4'>
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
    <nav className='flex justify-between items-center bg-gray-800 p-4 text-white'>
      <div className='flex space-x-4'>
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
        <span>{user.first_name}</span>
        <div className='flex'>
          <Link to='/cart' className='hover:text-gray-300'>
            Cart
          </Link>
          <p className='mx-2'>({totalItems})</p>
        </div>
        <button onClick={logout} className='hover:text-gray-300'>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
