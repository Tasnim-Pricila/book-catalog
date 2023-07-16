import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IBook {
    searchedText: string,
    genre: string
}

const initialState: IBook = {
    searchedText: '',
    genre: ''
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSearchedText: (state, action: PayloadAction<string>) => {
      state.searchedText = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
  },
});

export const { setSearchedText, setGenre } = bookSlice.actions;

export default bookSlice.reducer;