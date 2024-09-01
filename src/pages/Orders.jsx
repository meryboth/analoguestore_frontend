import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Orders() {
  const { token } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          setError('Failed to fetch tickets');
        }
      } catch (error) {
        setError('An error occurred while fetching tickets');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTickets();
    } else {
      setError('No token provided');
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Orders</h1>
      <table className='min-w-full bg-white border'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b'>Email</th>
            <th className='py-2 px-4 border-b'>Code</th>
            <th className='py-2 px-4 border-b'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.code}>
              <td className='py-2 px-4 border-b'>{ticket.purchaser}</td>
              <td className='py-2 px-4 border-b'>{ticket.code}</td>
              <td className='py-2 px-4 border-b'>${ticket.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
