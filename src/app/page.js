'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { PRODUCTS_DATA } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

export default function Home() {
  const { selectedCategory, maxPrice, searchQuery } = useSelector(
    (state) => state.filter
  );
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  // Filter products based on Redux state
  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#2d3748' }}>
      {/* Header */}
      <header style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>🛒 Nexus Cart</h1>
        <div style={cartBadgeStyle}>
          Cart Items: <strong>{cartQuantity}</strong>
        </div>
      </header>

      {/* Main Content Layout */}
      <div style={{ display: 'flex' }}>
        <FilterSidebar />
        <main style={{ flex: 1, padding: '24px' }}>
          <h2 style={{ marginTop: 0 }}>Products Catalog ({filteredProducts.length})</h2>
          {filteredProducts.length === 0 ? (
            <p style={{ color: '#718096' }}>No products match your selected filters.</p>
          ) : (
            <div style={gridStyle}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 24px',
  backgroundColor: '#2b6cb0',
  color: '#fff',
};

const cartBadgeStyle = {
  backgroundColor: '#2c5282',
  padding: '6px 14px',
  borderRadius: '20px',
  fontSize: '0.95rem',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: '20px',
  marginTop: '20px',
};