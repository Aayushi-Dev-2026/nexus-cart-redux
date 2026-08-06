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

export const { setCategory, setMaxPrice, setSearchQuery, resetFilters } =
  filterSlice.actions;
export default filterSlice.reducer;