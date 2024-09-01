import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../utils/api';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts({ limit: 12 });
      setProducts(data.payload);
    };

    getProducts();
  }, []);

  return (
    <div className='container mx-auto'>
      <header className='text-center py-8'>
        <h1 className='text-4xl font-bold'>Welcome to Our Store</h1>
      </header>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
