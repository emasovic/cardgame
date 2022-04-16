import React from "react";
import { Link } from "react-router-dom";
import { newGame } from "../../lib/routes";
import { createClassName } from "../../lib/utils";

import "./Loby.scss";

const CLASS = "Loby";

const PLAYERS = [2, 3, 4];

export default function Loby() {
  return (
    <div className={CLASS}>
      <h1 className={createClassName([CLASS, "title"])}>
        Select number of players
      </h1>
      {PLAYERS.map((i) => (
        <Link
          className={createClassName([CLASS, "item"])}
          to={newGame(i)}
          key={i}
        >
          {i} players
        </Link>
      ))}
    </div>
  );
}
