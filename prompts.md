# 📝 Sprint 10: Development Prompts & AI Architecture Audit Log

## Overview
This document logs the structured prompt-response history used during the architectural setup, state slice design, and UI component integration for **Nexus Cart Redux** (Track A: State Management Application).

---

## 📌 Phase 1: Redux Toolkit Initialization & Provider Setup

### 👤 User Prompt

> "I need to set up Redux Toolkit in my Next.js 15 (App Router) project for a global state management application. How should I initialize the store and handle client-side provider wrapping without causing SSR hydration warnings?"

### 🤖 AI Guidance & Implementation

**To integrate Redux Toolkit into Next.js App Router cleanly:**

1. Initialize `@reduxjs/toolkit` and `react-redux`.

2. Configure a central `store.js` using `configureStore`.

3. Create a `'use client'` wrapper component (`ReduxProvider.js`) to pass the store down to the app tree via `src/app/layout.js`.

#### Code Snippet: Store & Provider Wrapper

```javascript
// src/providers/ReduxProvider.js
'use client';

import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default function ReduxProvider({ children }) {
  return <Provider store="{store}">{children}</Provider>;
}
```

---

## 📌 Phase 2: Mock Dataset & Dynamic Filter Slice Logic

### 👤 User Prompt

>  "How do I structure a Redux slice to manage multi-criteria filter state (category selection, max price slider, and text search) along with mock dataset integration?"

### 🤖 AI Guidance & Implementation
1. Define filterSlice.js with initial state properties: selectedCategory, maxPrice, and searchQuery.

2. Create atomic reducers (setCategory, setMaxPrice, setSearchQuery, resetFilters).

3. Connect the state to FilterSidebar.js using useDispatch for state updates and useSelector in page.js to    derive filtered product lists.

#### Code Snippet: Filter Slice Reducers

```JavaScript
// src/redux/slices/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: 'All',
  maxPrice: 10000,
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    resetFilters(state) {
      state.selectedCategory = 'All';
      state.maxPrice = 10000;
      state.searchQuery = '';
    },
  },
});

export const { setCategory, setMaxPrice, setSearchQuery, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
```

---

## 📌 Phase 3: Interactive Cart Drawer & Global State Mutations

### 👤 User Prompt

>  "I want to build an interactive slide-over Shopping Cart Drawer. How should the cart state handle duplicate  items, total item counting, and quantity modifications dynamically?"

### 🤖 AI Guidance & Implementation

1. In cartSlice.js, design reducers to check existing items by unique id.

2. Automatically compute totalQuantity and totalAmount on every mutation (addToCart, decreaseQuantity, removeFromCart).

3. Use a toggleCart boolean flag in Redux to open/close the slide-over modal seamlessly across components.

#### Code Snippet: Cart State Mutation Logic

```JavaScript
// src/redux/slices/cartSlice.js
addToCart(state, action) {
  const newItem = action.payload;
  const existingItem = state.items.find((item) => item.id === newItem.id);
  state.totalQuantity++;
  if (!existingItem) {
    state.items.push({
      ...newItem,
      quantity: 1,
      totalPrice: newItem.price,
    });
  } else {
    existingItem.quantity++;
    existingItem.totalPrice += newItem.price;
  }
  state.totalAmount = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}
```

---

## 🎯 Summary of Outcomes

* **Centralized immutable state tree established with RTK.**

* **Seamless decoupling of business logic (slices) from presentation components.**

* **Complete alignment with Sprint 10 Track A requirements.**

---
