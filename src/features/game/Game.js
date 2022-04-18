import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchDeck,
  clearPool,
  selectPlayerIds,
  selectTotal,
  selectPlayers,
} from "./redux/gameSlice";
import Player from "./player/Player";
import { STATUS } from "lib/const";
import Loader from "components/loader/Loader";
import { createClassName } from "lib/utils";
import Card from "features/game/player/components/Card";

import "./Game.scss";
import Dialog from "components/dialog/Dialog";
import Button from "components/button/Button";

const CLASS = "Game";

const CARDS_PER_PLAYER = 10;

export default function Game() {
  const dispatch = useDispatch();
  const { players } = useParams();
  const { pool, status } = useSelector((state) => state.game);
  const total = useSelector(selectTotal);
  const ids = useSelector(selectPlayerIds);
  const byId = useSelector(selectPlayers);
  const [winners, setWinners] = useState([]);
  const isLoading = status === STATUS.loading;
  const shouldFindWinner = !isLoading && !byId[total - 1]?.cards.length;

  const loadDeck = useCallback(
    () => dispatch(fetchDeck({ count: CARDS_PER_PLAYER * players, players })),
    [dispatch, players]
  );

  const newGame = () => {
    setWinners([]);
    loadDeck();
  };

  useEffect(() => {
    players && loadDeck();
  }, [dispatch, players, loadDeck]);

  useEffect(() => {
    if (total && pool.length === total) {
      const newPool = [...pool];
      const winner = newPool.sort(
        (a, b) => b.cardValue - a.cardValue || b.index - a.index
      )[0];
      const points = newPool.map((i) => i.cardValue).reduce((a, b) => a + b, 0);
      setTimeout(() => dispatch(clearPool({ winner, points })), 500);
    }
  }, [pool, total, dispatch]);

  useEffect(() => {
    if (shouldFindWinner) {
      const sorted = byId.sort((a, b) => b.points - a.points);
      const winners = sorted.filter((i) => i.points === sorted[0].points);

      setTimeout(() => setWinners(winners), 1000);
    }
  }, [shouldFindWinner, byId]);

  if (isLoading) return <Loader />;

  return (
    <div className={CLASS}>
      <div className={createClassName([CLASS, "pool"])}>
        {pool.map((i, index) => (
          <Card key={index} card={i} />
        ))}
      </div>
      {ids.map((i) => (
        <Player key={i} id={i} />
      ))}

      {!!winners.length && (
        <Dialog isOpen={!!winners}>
          <div className={createClassName([CLASS, "winners"])}>
            <h2 className={createClassName([CLASS, "winners", "title"])}>
              Winners
            </h2>
            <div className={createClassName([CLASS, "winners", "winner"])}>
              <p>Name</p>
              <p>Points</p>
            </div>
            {winners.map((i) => (
              <div
                key={i.id}
                className={createClassName([CLASS, "winners", "winner"])}
              >
                <p>{i.name}</p>
                <p>{i.points}</p>
              </div>
            ))}
            <Button label="New game" onClick={newGame} />
          </div>
        </Dialog>
      )}
    </div>
  );
}
