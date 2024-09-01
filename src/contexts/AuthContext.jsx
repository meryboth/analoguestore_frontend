import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, fetchCartById } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('jwt');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      fetchAndSetCart(JSON.parse(savedUser).cart._id, savedToken);
    }
  }, []);

  const fetchAndSetCart = async (cartId, token) => {
    try {
      const cartData = await fetchCartById(cartId, token);
      const initialTotal = cartData.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setTotalItems(initialTotal);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setTotalItems(0);
    }
  };

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    if (data) {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      fetchAndSetCart(data.user.cart._id, data.token);
      navigate('/');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setTotalItems(0);
    setChatMessages([]);
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const resetTotalItems = () => {
    setTotalItems(0);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        totalItems,
        setTotalItems,
        login,
        logout,
        resetTotalItems,
        setUser,
        setToken,
        chatMessages,
        setChatMessages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
