import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { CARD_VALUES, PLAYER_NAMES, STATUS } from "lib/const";
import { drawCards } from "./playerAPI";

const newUser = (payload) => ({
  id: payload.playerId,
  cards: payload.cards,
  isHuman: payload.isHuman,
  name: PLAYER_NAMES[payload.playerId],
  points: [],
});

const initialState = {
  data: {},
  pool: [],
  currentPlayer: 0,
  error: null,
  status: STATUS.idle,
};

export const fetchCards = createAsyncThunk(
  "players/fetchCards",
  async (payload) => {
    const res = await drawCards(payload);
    if (res.error) return res;
    return newUser({ ...payload, ...res });
  }
);

export const playersSlice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
    throwCard: (state, { payload }) => {
      const currentState = current(state);
      const total = Object.keys(currentState.data).length;
      const currentUser = state.data[payload.id];
      const poolItem = {
        cardValue:
          CARD_VALUES[payload.card?.value] || Number(payload.card?.value),
        images: payload.card.images,
        userId: payload.id,
      };

      const updatedCards = currentState.data[payload.id].cards.filter(
        (c, index) => index !== payload.card.index
      );

      currentUser.cards = updatedCards;

      state.currentPlayer =
        total > payload.id + 1 ? state.currentPlayer + 1 : 0;

      state.pool.push(poolItem);
    },
    clearPool: (state) => {
      const pool = [...current(state).pool];

      const winner = pool.sort(
        (a, b) => b.cardValue - a.cardValue || b.userId - a.userId
      )[0];

      const points = pool.map((i) => i.cardValue);

      state.data[winner.userId].points.push(...points);

      state.pool = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(fetchCards.fulfilled, (state, { payload }) => {
        state.status = STATUS.idle;

        if (payload.error) {
          state.error = payload?.error?.message;
        } else {
          state.data[payload.id] = payload;
        }
      });
  },
});

export const { throwCard, clearPool } = playersSlice.actions;

export const selectPlayers = (state) => state.players;

export const selectPlayer = (state, id) => state.players.data[id];

export default playersSlice.reducer;
