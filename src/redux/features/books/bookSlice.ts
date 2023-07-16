import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IBook {
    searchedText: string
}

const initialState: IBook = {
    searchedText: ''
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSearchedText: (state, action: PayloadAction<string>) => {
      state.searchedText = action.payload;
    },
  },
});

export const { setSearchedText } = bookSlice.actions;

export default bookSlice.reducer;