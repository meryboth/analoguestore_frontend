import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { addProductToCart } from '../utils/api';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user, token, fetchAndSetCart, setTotalItems } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);
  const handleAddToCart = async () => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    try {
      const result = await addProductToCart(
        user.cart._id,
        product._id,
        quantity,
        token
      );
      if (result) {
        console.log('Product added to cart successfully', result);
        alert('Product added to cart successfully');
        setTotalItems((prevTotal) => prevTotal + quantity);
      } else {
        console.error('Failed to add product to cart');
        alert('You cant add your own product to the cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto py-8'>
      <nav className='mb-4'>
        <Link to='/shop' className='text-blue-500 hover:underline'>
          ← Volver a Productos
        </Link>
      </nav>
      <div className='flex flex-col md:flex-row'>
        <img
          src={product.img}
          alt={product.title}
          className='w-full md:w-1/2 h-auto object-cover'
        />
        <div className='md:ml-8'>
          <h1 className='text-3xl font-bold mb-4'>{product.title}</h1>
          <p className='text-gray-700 mb-4'>{product.description}</p>
          <p className='text-xl font-bold mb-4'>${product.price}</p>
          <div className='mb-4'>
            <label className='mr-2'>Cantidad:</label>
            <input
              type='number'
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className='border p-2 w-16'
              min='1'
              max={product.stock}
            />
          </div>
          <button
            onClick={handleAddToCart}
            className='bg-blue-500 text-white p-3 rounded hover:bg-blue-600'
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
