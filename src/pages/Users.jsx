import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fetchUsers, deleteUser, updateUser, createUser } from '../utils/api';

function Users() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'user',
  });

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers(token);
      setUsers(data);
    };
    loadUsers();
  }, [token]);

  const handleDelete = async (id) => {
    await deleteUser(id, token);
    setUsers(users.filter((user) => user._id !== id));
  };

  const handleUpdate = async (id, updatedData) => {
    const updatedUser = await updateUser(id, updatedData, token);
    setUsers(users.map((user) => (user._id === id ? updatedUser : user)));
  };

  const handleCreate = async () => {
    await createUser(newUser, token);
    const data = await fetchUsers(token);
    setUsers(data);
    setNewUser({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'user',
    });
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Manage Users</h1>
      <div className='mb-4'>
        <h2 className='text-xl font-bold'>Create New User</h2>
        <input
          type='text'
          placeholder='First Name'
          value={newUser.first_name}
          onChange={(e) =>
            setNewUser({ ...newUser, first_name: e.target.value })
          }
          className='border p-2 mr-2'
        />
        <input
          type='text'
          placeholder='Last Name'
          value={newUser.last_name}
          onChange={(e) =>
            setNewUser({ ...newUser, last_name: e.target.value })
          }
          className='border p-2 mr-2'
        />
        <input
          type='email'
          placeholder='Email'
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className='border p-2 mr-2'
        />
        <input
          type='password'
          placeholder='Password'
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className='border p-2 mr-2'
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className='border p-2 mr-2'
        >
          <option value='user'>User</option>
          <option value='premium'>Premium</option>
          <option value='admin'>Admin</option>
        </select>
        <button
          onClick={handleCreate}
          className='bg-blue-500 text-white p-2 rounded'
        >
          Create User
        </button>
      </div>

      <h2 className='text-xl font-bold mb-2'>User List</h2>
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Email</th>
            <th className='px-4 py-2'>Role</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className='border px-4 py-2'>
                {user.first_name} {user.last_name}
              </td>
              <td className='border px-4 py-2'>{user.email}</td>
              <td className='border px-4 py-2'>
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleUpdate(user._id, { role: e.target.value })
                  }
                  className='border p-1'
                >
                  <option value='user'>User</option>
                  <option value='premium'>Premium</option>
                  <option value='admin'>Admin</option>
                </select>
              </td>
              <td className='border px-4 py-2'>
                <button
                  onClick={() => handleDelete(user._id)}
                  className='bg-red-500 text-white p-1 rounded'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
