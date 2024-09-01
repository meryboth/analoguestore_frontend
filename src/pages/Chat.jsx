import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { AuthContext } from '../contexts/AuthContext';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const socket = io(`${BASE_URL}`);

function Chat() {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/chat' } });
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/messages`);
        const initialMessages = await response.json();
        setMessages(initialMessages);
      } catch (error) {
        console.error('Error al cargar los mensajes:', error);
      }
    };

    fetchMessages();

    socket.on('connect', () => {
      console.log('Conectado al servidor de Socket.io con ID:', socket.id);
    });

    socket.on('messagesLogs', (data) => {
      console.log('Mensajes recibidos desde el servidor:', data);
      setMessages([...data]);
    });

    socket.on('disconnect', () => {
      console.log('Desconectado del servidor de Socket.io');
    });

    return () => {
      socket.off('messagesLogs');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [user, navigate]);

  const handleSendMessage = () => {
    if (message.trim().length > 0) {
      const newMessage = { user: user.first_name, message };
      socket.emit('message', newMessage);
      setMessage('');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className='mx-10 mt-8 bg-white shadow-md rounded-lg overflow-hidden'>
      <div className='bg-gray-200 p-4 border-b border-gray-300'>
        <h2 className='text-lg font-semibold text-gray-800'>
          Chat Comunitario
        </h2>
      </div>

      <div
        id='messagesLogs'
        className='p-6 space-y-4 h-[80vh] overflow-y-auto bg-gray-50'
      >
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className='flex items-start space-x-4 mb-4'>
              <div className='bg-blue-100 text-blue-800 px-4 py-2 rounded-lg max-w-xs'>
                <strong className='block text-sm font-semibold'>
                  {msg.user || 'Anónimo'}
                </strong>
                <p className='text-sm'>{msg.message || 'Sin mensaje'}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay mensajes aún. ¡Sé el primero en escribir algo!</p>
        )}
      </div>

      <div className='bg-gray-100 p-4 border-t border-gray-300'>
        <div className='flex items-center'>
          <input
            type='text'
            placeholder='Escribe un mensaje...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
            className='flex-grow bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent'
          />
          <button
            onClick={handleSendMessage}
            className='ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
