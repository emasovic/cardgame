import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDeck, selectDeck } from "./deckSlice";
import Player from "../player/Player";
import { PLAYER_POSITION, STATUS } from "lib/const";
import Loader from "components/loader/Loader";
import { clearPool, selectPlayers } from "features/player/playerSlice";
import { createClassName } from "lib/utils";
import Card from "features/player/components/Card";

import "./Game.scss";

const CLASS = "Game";

const CARDS_PER_PLAYER = 10;

export default function Game() {
  const dispatch = useDispatch();
  const { players } = useParams();
  const { data, status } = useSelector(selectDeck);
  const { pool } = useSelector(selectPlayers);

  useEffect(() => {
    players && dispatch(fetchDeck({ deck_count: 1 }));
  }, [dispatch, players]);

  useEffect(() => {
    if (pool.length === Number(players)) {
      setTimeout(() => dispatch(clearPool()), 500);
    }
  }, [pool, players, dispatch]);

  if (status === STATUS.loading || !data) return <Loader />;
  return (
    <div className={CLASS}>
      <div className={createClassName([CLASS, "pool"])}>
        {pool.map((i, index) => (
          <Card key={index} card={i} />
        ))}
      </div>
      {[...Array(Number(players)).keys()].map((i) => (
        <Player
          key={i}
          position={PLAYER_POSITION[i]}
          playerId={i}
          deckId={data.deck_id}
          count={CARDS_PER_PLAYER}
          isHuman={i === 0}
        />
      ))}
    </div>
  );
}
