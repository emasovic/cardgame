import * as http from "lib/http";

export const getDeck = (filter) => http.get("deck/new/shuffle/", filter);
