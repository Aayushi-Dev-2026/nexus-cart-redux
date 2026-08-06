'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategory,
  setMaxPrice,
  setSearchQuery,
  resetFilters,
} from '../redux/slices/filterSlice';

const CATEGORIES = ['All', 'Electronics', 'Furniture', 'Lifestyle'];

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const { selectedCategory, maxPrice, searchQuery } = useSelector(
    (state) => state.filter
  );

  return (
    <div style={sidebarStyle}>
      <h2 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Filter Products</h2>

      {/* Search Input */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Search:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder="Search items..."
          style={inputStyle}
        />
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Category:</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              style={{
                ...catButtonStyle,
                backgroundColor: selectedCategory === cat ? '#3182ce' : '#edf2f7',
                color: selectedCategory === cat ? '#fff' : '#2d3748',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Max Price: ₹{maxPrice}</label>
        <input
          type="range"
          min="500"
          max="10000"
          step="500"
          value={maxPrice}
          onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
          style={{ width: '100%' }}
        />
      </div>

      {/* Reset Button */}
      <button onClick={() => dispatch(resetFilters())} style={resetButtonStyle}>
        Reset Filters
      </button>
    </div>
  );
}

const sidebarStyle = {
  width: '240px',
  padding: '20px',
  borderRight: '1px solid #e2e8f0',
  backgroundColor: '#f7fafc',
  minHeight: '80vh',
};

const labelStyle = {
  display: 'block',
  fontWeight: '600',
  marginBottom: '6px',
  fontSize: '0.9rem',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #cbd5e0',
  boxSizing: 'border-box',
};

const catButtonStyle = {
  padding: '8px',
  borderRadius: '6px',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  fontWeight: '500',
};

const resetButtonStyle = {
  width: '100%',
  padding: '8px',
  backgroundColor: '#e53e3e',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
};