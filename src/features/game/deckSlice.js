import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "lib/const";
import { getDeck } from "./deckAPI";

const initialState = {
  data: null,
  error: null,
  status: STATUS.idle,
};

export const fetchDeck = createAsyncThunk("deck/fetchDeck", async (payload) => {
  return await getDeck(payload);
});

export const deckSlice = createSlice({
  name: "deck",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeck.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(fetchDeck.fulfilled, (state, { payload }) => {
        state.status = STATUS.idle;

        if (payload.error) {
          state.error = payload?.error?.message;
        } else {
          state.data = payload;
        }
      });
  },
});

export const selectDeck = (state) => state.deck;

export default deckSlice.reducer;
