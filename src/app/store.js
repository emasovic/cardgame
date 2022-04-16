import { configureStore } from "@reduxjs/toolkit";
import deck from "features/game/deckSlice";
import players from "features/player/playerSlice";

export const store = configureStore({
  reducer: {
    deck,
    players,
  },
});
