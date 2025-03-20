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
        const priceCondition =
          Object.keys(priceFilter).length === 0 ||
          (item.price <= Number(priceFilter.max) &&
            item.price >= Number(priceFilter.min));

        const materialCondition = materialFilter
          ? item.subtitle && item.subtitle.includes(materialFilter)
          : true;

        const stoneCondition = stonFilter
          ? item.stone && item.stone.includes(stonFilter)
          : true;

        const categoryCondition =
          itemFilter || itemFilter === 0 ? item.category === itemFilter : true;

        return (
          priceCondition &&
          materialCondition &&
          stoneCondition &&
          categoryCondition
        );
      });
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
