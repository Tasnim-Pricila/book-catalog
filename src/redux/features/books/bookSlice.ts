import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IBook {
    searchedText: string,
    genre: string,
    publicationDate: string
}

const initialState: IBook = {
    searchedText: '',
    genre: '',
    publicationDate: ''
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
    setPublicationDate: (state, action: PayloadAction<string>) => {
      state.publicationDate = action.payload;
    },
  },
});

export const { setSearchedText, setGenre, setPublicationDate } = bookSlice.actions;

export default bookSlice.reducer;