'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleCart,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../redux/slices/cartSlice';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount, isCartOpen } = useSelector(
    (state) => state.cart
  );

  if (!isCartOpen) return null;

  return (
    <div style={backdropStyle} onClick={() => dispatch(toggleCart())}>
      <div style={drawerStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={headerStyle}>
          <h2>Your Shopping Cart ({totalQuantity})</h2>
          <button onClick={() => dispatch(toggleCart())} style={closeBtnStyle}>
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div style={itemsContainerStyle}>
          {items.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#718096', marginTop: '40px' }}>
              Your cart is empty. Start adding items!
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} style={itemCardStyle}>
                <img src={item.image} alt={item.title} style={itemImgStyle} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: '0.95rem' }}>{item.title}</h4>
                  <p style={{ margin: '0 0 8px', color: '#2b6cb0', fontWeight: 'bold' }}>
                    ₹{item.price} x {item.quantity} = ₹{item.totalPrice}
                  </p>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      style={qtyBtnStyle}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      style={qtyBtnStyle}
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      style={removeBtnStyle}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={footerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Total Amount:</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2b6cb0' }}>
                ₹{totalAmount}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => dispatch(clearCart())} style={clearBtnStyle}>
                Clear Cart
              </button>
              <button
                onClick={() => alert('Order placed successfully!')}
                style={checkoutBtnStyle}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'flex-end',
  zIndex: 1000,
};

const drawerStyle = {
  width: '380px',
  height: '100%',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  boxSizing: 'border-box',
  boxShadow: '-4px 0 12px rgba(0,0,0,0.15)',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: '12px',
};

const closeBtnStyle = {
  border: 'none',
  background: 'none',
  fontSize: '1.2rem',
  cursor: 'pointer',
};

const itemsContainerStyle = {
  flex: 1,
  overflowY: 'auto',
  margin: '16px 0',
};

const itemCardStyle = {
  display: 'flex',
  gap: '12px',
  padding: '10px',
  border: '1px solid #edf2f7',
  borderRadius: '8px',
  marginBottom: '10px',
};

const itemImgStyle = {
  width: '60px',
  height: '60px',
  objectFit: 'cover',
  borderRadius: '6px',
};

const qtyBtnStyle = {
  padding: '2px 8px',
  border: '1px solid #cbd5e0',
  backgroundColor: '#edf2f7',
  borderRadius: '4px',
  cursor: 'pointer',
};

const removeBtnStyle = {
  marginLeft: 'auto',
  padding: '2px 8px',
  border: 'none',
  backgroundColor: '#feb2b2',
  color: '#9b2c2c',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.8rem',
};

const footerStyle = {
  borderTop: '1px solid #e2e8f0',
  paddingTop: '12px',
};

const clearBtnStyle = {
  flex: 1,
  padding: '10px',
  border: '1px solid #cbd5e0',
  backgroundColor: '#edf2f7',
  borderRadius: '6px',
  cursor: 'pointer',
};

const checkoutBtnStyle = {
  flex: 1,
  padding: '10px',
  border: 'none',
  backgroundColor: '#38a169',
  color: '#fff',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
};