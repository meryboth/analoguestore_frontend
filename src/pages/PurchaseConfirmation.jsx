import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function PurchaseConfirmation() {
  const location = useLocation();
  const { ticket, notPurchasedProducts } = location.state || {};

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-8'>Confirmación de Compra</h1>
      {ticket ? (
        <div>
          <p>¡Gracias por tu compra!</p>
          <p>
            Tu número de orden es: <strong>{ticket.code}</strong>
          </p>
          <p>Total pagado: ${ticket.amount}</p>
          <p>
            Fecha de compra:{' '}
            {new Date(ticket.purchase_datetime).toLocaleString()}
          </p>
          <p>
            Un correo con los detalles de tu compra ha sido enviado a tu email.
          </p>
        </div>
      ) : (
        <div>
          <p>
            No se pudieron comprar algunos productos debido a la falta de stock.
          </p>
          {notPurchasedProducts.length > 0 && (
            <ul>
              {notPurchasedProducts.map((productId) => (
                <li key={productId}>Producto ID: {productId}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      <Link to='/shop' className='text-blue-500 hover:underline mt-4 block'>
        Volver a la tienda
      </Link>
    </div>
  );
}

export default PurchaseConfirmation;
