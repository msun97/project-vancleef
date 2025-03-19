import { productdata } from '@/assets/api/productdata';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  purchaseItem: JSON.parse(localStorage.getItem('purchaseItem')) || [],
  purchasedData: JSON.parse(localStorage.getItem('purchasedData')) || [],
  reservationItem: JSON.parse(localStorage.getItem('reservationItem')) || {},
};

export const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    setItem: (state, action) => {
      const cartItem = action.payload;
      const allData = productdata;
      state.purchaseItem = allData.map(item => {
        return item.data.filter(data => cartItem.includes(data.productnumber));
      });
      localStorage.setItem('purchaseItem', JSON.stringify(state.purchaseItem));
    },
    addPurchased: (state, action) => {
      state.purchasedData = action.payload;
      localStorage.setItem(
        'purchasedData',
        JSON.stringify(state.purchasedData),
      );
    },
    addReservation: (state, action) => {
      state.reservationItem = action.payload;
      localStorage.setItem(
        'reservationItem',
        JSON.stringify(state.reservationItem),
      );
    },
  },
});

export const purchaseActions = purchaseSlice.actions;

export default purchaseSlice.reducer;
