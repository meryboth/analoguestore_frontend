import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { addProduct } from '../utils/api';

function NewProduct() {
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    img: '',
    code: '',
    stock: '',
    category: '',
    status: true,
    thumbnails: [''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleThumbnailChange = (index, value) => {
    const newThumbnails = [...formData.thumbnails];
    newThumbnails[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      thumbnails: newThumbnails,
    }));
  };

  const addThumbnailField = () => {
    setFormData((prevData) => ({
      ...prevData,
      thumbnails: [...prevData.thumbnails, ''],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addProduct(formData, token);
    if (result) {
      alert('Product added successfully!');
      setFormData({
        title: '',
        description: '',
        price: '',
        img: '',
        code: '',
        stock: '',
        category: '',
        status: true,
        thumbnails: [''],
      });
    } else {
      alert('Failed to add product');
    }
  };

  return (
    <div className='max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2' htmlFor='title'>
            Title
          </label>
          <input
            id='title'
            name='title'
            type='text'
            value={formData.title}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 font-bold mb-2'
            htmlFor='description'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2' htmlFor='price'>
            Price
          </label>
          <input
            id='price'
            name='price'
            type='number'
            value={formData.price}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2' htmlFor='img'>
            Image URL
          </label>
          <input
            id='img'
            name='img'
            type='text'
            value={formData.img}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2' htmlFor='code'>
            Product Code
          </label>
          <input
            id='code'
            name='code'
            type='text'
            value={formData.code}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2' htmlFor='stock'>
            Stock
          </label>
          <input
            id='stock'
            name='stock'
            type='number'
            value={formData.stock}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 font-bold mb-2'
            htmlFor='category'
          >
            Category
          </label>
          <input
            id='category'
            name='category'
            type='text'
            value={formData.category}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 font-bold mb-2'
            htmlFor='status'
          >
            Status
          </label>
          <select
            id='status'
            name='status'
            value={formData.status}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
            required
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 font-bold mb-2'
            htmlFor='thumbnails'
          >
            Thumbnails
          </label>
          {formData.thumbnails.map((thumbnail, index) => (
            <input
              key={index}
              type='text'
              value={thumbnail}
              onChange={(e) => handleThumbnailChange(index, e.target.value)}
              className='w-full p-2 border border-gray-300 rounded mb-2'
              placeholder={`Thumbnail ${index + 1}`}
            />
          ))}
          <button
            type='button'
            onClick={addThumbnailField}
            className='text-blue-500 hover:underline'
          >
            Add another thumbnail
          </button>
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
