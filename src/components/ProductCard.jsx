import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`); // Navega a la pantalla de detalles con el ID del producto
  };

  return (
    <div
      className='border p-4 rounded shadow-md cursor-pointer'
      onClick={handleCardClick}
    >
      <img
        src={product.img}
        alt={product.title}
        className='mb-4 w-full h-48 object-cover'
      />
      <h3 className='text-xl font-bold mb-2'>{product.title}</h3>
      <p className='text-gray-700 mb-2'>{product.description}</p>
      <p className='text-gray-900 font-bold'>${product.price}</p>
    </div>
  );
}

export default ProductCard;
