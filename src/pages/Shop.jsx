import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../utils/api';

function Shop() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts({ limit: 12, page });
      setProducts(data.payload);
    };

    getProducts();
  }, [page]);

  return (
    <div>
      <header className='text-center py-8'>
        <h1 className='text-4xl font-bold'>Shop All Products</h1>
      </header>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-24'>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {products.length > 8 && (
        <div className='flex justify-between mt-6'>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className='bg-gray-800 text-white px-4 py-2 rounded'
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className='bg-gray-800 text-white px-4 py-2 rounded'
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Shop;
