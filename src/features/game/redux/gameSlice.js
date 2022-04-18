import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { STATUS } from "lib/const";
import { getDeck } from "./gameAPI";
import { newGame } from "./helper";

export const fetchDeck = createAsyncThunk("deck/fetchDeck", async (payload) => {
  const res = await getDeck({ count: payload.count });
  if (res.error) return { error: res.error };

  return newGame({ deck: res, numberOfPlayers: payload.players });
});

const gameAdapter = createEntityAdapter();

export const gameSlice = createSlice({
  name: "game",
  initialState: gameAdapter.getInitialState({
    deck: null,
    pool: [],
    currentPlayerIndex: 0,
    error: null,
    status: STATUS.idle,
  }),

  reducers: {
    throwCard: (state, { payload }) => {
      gameAdapter.updateOne(state, {
        id: payload.player.id,
        changes: payload.player,
      });
      state.currentPlayerIndex += 1;
      state.pool.push(payload.poolItem);
    },
    clearPool: (state, { payload }) => {
      state.entities[payload.winner.id].points += payload.points;
      state.currentPlayerIndex = 0;
      state.pool = [];
    },
  },
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
          gameAdapter.setAll(state, payload.players);
          state.deck = payload.deck;
        }
      });
  },
});

export const { throwCard, clearPool } = gameSlice.actions;

const gameSelector = gameAdapter.getSelectors((state) => state.game);

export const selectPlayers = (state) => gameSelector.selectAll(state);
export const selectTotal = (state) => gameSelector.selectTotal(state);
export const selectPlayerIds = (state) => gameSelector.selectIds(state);
export const selectPlayer = (state, id) => gameSelector.selectById(state, id);

export default gameSlice.reducer;
