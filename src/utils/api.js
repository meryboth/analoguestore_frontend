const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/api/sessions/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const registerUser = async (userInfo) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const fetchProducts = async ({ limit = 12, page = 1 } = {}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/products?limit=${limit}&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const fetchCartById = async (cartId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/carts/${cartId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const removeProductFromCart = async (cartId, productId, token) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/carts/${cartId}/product/${productId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to remove product from cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const updateProductQuantity = async (
  cartId,
  productId,
  quantity,
  token
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/carts/${cartId}/product/${productId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product: productId, quantity }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to update product quantity');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const addProductToCart = async (cartId, productId, quantity, token) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/carts/${cartId}/product/${productId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to add product to cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const purchaseCart = async (cartId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/carts/${cartId}/purchase`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to complete purchase');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const addProduct = async (productData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const fetchUsers = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const deleteUser = async (userId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateUser = async (userId, updateData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const createUser = async (userData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
