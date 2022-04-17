import { configureStore } from "@reduxjs/toolkit";
import game from "features/game/redux/gameSlice";

export const store = configureStore({
  reducer: {
    game,
  },
});
