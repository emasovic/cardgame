import { nanoid } from "@reduxjs/toolkit";
import { PLAYER_NAMES, PLAYER_POSITION } from "lib/const";

const SLICE_START = {
  0: 0,
  1: 10,
  2: 20,
  3: 30,
};

export const newGame = ({ numberOfPlayers, deck }) => {
  const players = [...Array(Number(numberOfPlayers)).keys()].map((i) => ({
    id: nanoid(),
    isHuman: i === 0,
    name: PLAYER_NAMES[i],
    points: 0,
    cards: deck.cards.slice(SLICE_START[i], SLICE_START[i] + 10),
    position: PLAYER_POSITION[i],
    index: i,
  }));

  return { players, deck };
};
