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
    <div className='bg-white text-black min-h-screen'>
      <header className='text-center py-16'>
        <h1 className='text-5xl font-light tracking-tight text-left px-5 py-5'>
          Analogue is an independent publisher and online store specialising in
          design and visual culture. We produce and curate a unique selection of
          design objects from around the world.
        </h1>
      </header>
      <div className='mb-24'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0'>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
