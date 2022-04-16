import * as http from "lib/http";

export const drawCards = ({ deckId, count }) =>
  http.get(`deck/${deckId}/draw/`, { count });
