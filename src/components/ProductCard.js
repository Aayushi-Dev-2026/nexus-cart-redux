'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div style={cardStyle}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <h3 style={{ fontSize: '1.1rem', margin: '12px 0 6px' }}>{product.title}</h3>
      <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 8px' }}>
        Category: <strong>{product.category}</strong> | Rating: ⭐ {product.rating}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2b6cb0' }}>
          ₹{product.price}
        </span>
        <button onClick={handleAddToCart} style={buttonStyle}>
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
};

const buttonStyle = {
  backgroundColor: '#3182ce',
  color: '#fff',
  border: 'none',
  padding: '8px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
};