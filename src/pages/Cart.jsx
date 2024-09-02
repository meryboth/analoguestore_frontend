import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import {
  fetchCartById,
  removeProductFromCart,
  updateProductQuantity,
  purchaseCart,
} from '../utils/api';

function Cart() {
  const { user, token, setTotalItems, resetTotalItems } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    const loadCart = async () => {
      try {
        const cartData = await fetchCartById(user.cart._id);
        if (cartData) {
          setCartItems(cartData);

          const initialTotal = cartData.reduce(
            (total, item) => total + item.quantity,
            0
          );
          setTotalItems(initialTotal);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user, navigate, setTotalItems]);

  const handlePurchase = async () => {
    try {
      const result = await purchaseCart(user.cart._id, token);
      if (result) {
        resetTotalItems();
        navigate('/purchase-confirmation', { state: result });
      } else {
        console.error('Purchase failed');
      }
    } catch (error) {
      console.error('Error during purchase:', error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const result = await updateProductQuantity(
        user.cart._id,
        productId,
        newQuantity,
        token
      );

      if (result) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );

        // Recalcular totalItems basado en el nuevo estado del carrito
        setTotalItems(
          (prevTotal) =>
            prevTotal +
            (newQuantity -
              cartItems.find((item) => item.product._id === productId).quantity)
        );
      } else {
        console.error('Failed to update product quantity');
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const result = await removeProductFromCart(
        user.cart._id,
        productId,
        token
      );

      if (result) {
        const updatedCartItems = cartItems.filter(
          (item) => item.product._id !== productId
        );
        setCartItems(updatedCartItems);

        const updatedTotalItems = updatedCartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setTotalItems(updatedTotalItems);
      } else {
        console.error('Failed to remove product from cart');
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className='container py-8 mx-auto'>
      <h1 className='text-3xl font-bold mb-8'>Your Cart</h1>

      {cartItems.length === 0 ? (
        <div>
          <p>
            Your cart is empty. Go to the{' '}
            <a href='/shop' className='text-blue-500 hover:underline'>
              Shop
            </a>{' '}
            to start adding products!
          </p>
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='w-full'>
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className='flex items-center justify-between mb-4 border-b pb-4'
              >
                <img
                  src={item.product.img || 'https://via.placeholder.com/150'}
                  alt={item.product.title}
                  className='w-20 h-20 object-cover'
                />
                <div className='flex-grow ml-4'>
                  <h2 className='text-xl font-bold'>{item.product.title}</h2>
                  <p className='text-gray-600'>
                    {item.product.description || 'No description available'}
                  </p>
                </div>
                <div className='flex items-center'>
                  <input
                    type='number'
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.product._id, parseInt(e.target.value))
                    }
                    className='border p-2 w-16 mr-4'
                    min='1'
                  />
                  <p className='text-xl font-bold'>
                    ${item.product.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className='ml-4 text-red-600 hover:underline'
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='w-full'>
            <div className='bg-gray-100 p-4 rounded'>
              <h2 className='text-xl font-bold mb-4'>Resumen del Pedido</h2>
              <div className='flex justify-between mb-2'>
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className='flex justify-between mb-4'>
                <span>Envío</span>
                <span>$5.00</span>
              </div>
              <div className='flex justify-between text-lg font-bold'>
                <span>Total</span>
                <span>${calculateTotal() + 5}</span>
              </div>
              <button
                onClick={handlePurchase}
                className='bg-blue-500 text-white p-3 mt-4 w-full rounded hover:bg-blue-600'
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
