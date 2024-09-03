import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      className='bg-white text-black p-6 cursor-pointer transition transform hover:scale-105 border border-gray-200'
      onClick={handleCardClick}
    >
      <img
        src={product.img}
        alt={product.title}
        className='mb-6 w-full h-64 object-cover rounded-lg'
      />
      <h3 className='text-2xl font-semibold mb-3'>{product.title}</h3>
      {/* <p className='text-gray-400 mb-4'>{product.category}</p> */}
      <p className='text-lg text-gray-400 text-light'>${product.price}</p>
    </div>
  );
}

export default ProductCard;
