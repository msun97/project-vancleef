import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  originalData: [],
  filterData: [],
  priceFilter: {},
  materialFilter: '',
  stonFilter: '',
  itemFilter: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setOriginal: (state, action) => {
      state.originalData = action.payload;
    },
    setFiltered: (state, action) => {
      const { priceFilter, materialFilter, stonFilter, itemFilter } =
        action.payload;
      state.priceFilter = priceFilter;
      state.materialFilter = materialFilter;
      state.stonFilter = stonFilter;
      state.itemFilter = itemFilter;
      state.filterData = state.originalData.filter(item => {
        const isPriceValid =
          Object.keys(priceFilter).length === 0 ||
          (item.price <= Number(priceFilter.max) &&
            item.price >= Number(priceFilter.min));

        const isMaterialValid =
          !materialFilter || item.subtitle.includes(materialFilter);
        const isStoneValid = item.stone
          ? item.stone.includes(stonFilter)
          : false;
        const isCategoryValid =
          itemFilter === undefined || item.category === itemFilter;

        return (
          isPriceValid && isMaterialValid && isStoneValid && isCategoryValid
        );
      });

      localStorage.setItem('filterData', JSON.stringify(state.filterData));
      localStorage.setItem('priceFilter', priceFilter);
      localStorage.setItem('materialFilter', materialFilter);
      localStorage.setItem('stonFilter', stonFilter);
      localStorage.setItem('itemFilter', itemFilter);
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
