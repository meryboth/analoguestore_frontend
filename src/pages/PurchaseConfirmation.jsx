import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function PurchaseConfirmation() {
  const location = useLocation();
  const { ticket, notPurchasedProducts } = location.state || {};

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-8'>Purchase Confirmation</h1>
      {ticket ? (
        <div>
          <p>Thank you for your purchase!</p>
          <p>
            Your order number is: <strong>{ticket.code}</strong>
          </p>
          <p>Total paid: ${ticket.amount}</p>
          <p>
            Purchase date: {new Date(ticket.purchase_datetime).toLocaleString()}
          </p>
          <p>
            An email with your purchase details has been sent to your email
            address.
          </p>
        </div>
      ) : (
        <div>
          <p>Some products could not be purchased due to lack of stock.</p>
          {notPurchasedProducts.length > 0 && (
            <ul>
              {notPurchasedProducts.map((productId) => (
                <li key={productId}>Product ID: {productId}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      <Link
        to='/shop'
        className='text-black font-bold hover:underline mt-4 block'
      >
        Return to shop
      </Link>
    </div>
  );
}

export default PurchaseConfirmation;
