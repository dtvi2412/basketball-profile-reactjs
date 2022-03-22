import { createSlice } from '@reduxjs/toolkit';

const theme = createSlice({
  name: 'theme',
  initialState: {
    themeDefault: {
      bgHeader: 'bg-[#fff]',
      bgContent: 'bg-[#E5E7EA]',
      bgBottom: 'bg-[#C2C6CB]',
      bgPrimary: 'bg-[#1D4ED2]',
      bgPrimaryAlpha: 'bg-[#1D4ED2CC]',
      bgSecond: 'bg-[#161516]',
      bgSecondAlpha: 'bg-[#161516CC]',
      color: 'text-[#111]',
      colorNumberShirt: 'text-[#E1484B]',
      colorPosition: 'text-[#E1484B]',
      colorBottom: 'text-black',
      colorRebounds: 'text-[#fff]',
    },
  },
  reducers: {
    updateTheme(state, action) {
      state.themeDefault = action.payload.yourTheme;
    },
  },
});

export default theme.reducer;

export const { updateTheme } = theme.actions;
