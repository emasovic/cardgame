import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "./components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCards,
  selectPlayer,
  selectPlayers,
  throwCard,
} from "./playerSlice";
import Loader from "components/loader/Loader";
import { nanoid } from "@reduxjs/toolkit";
import "./Player.scss";
import classNames from "classnames";
import { createClassName, getRandomNumber } from "lib/utils";
import { PLAYER_POSITION } from "lib/const";

const CLASS = "Player";

function Player({ deckId, count, playerId, position, isHuman }) {
  const dispatch = useDispatch();
  const { currentPlayer } = useSelector(selectPlayers);
  const player = useSelector((state) => selectPlayer(state, playerId));
  const isPlayersTurn = currentPlayer === playerId;
  const isRobotsTurn = !isHuman && isPlayersTurn;

  const handleThrowCard = useCallback(
    (card) => {
      return dispatch(throwCard({ id: playerId, card }));
    },
    [playerId, dispatch]
  );

  useEffect(() => {
    dispatch(fetchCards({ deckId, count, playerId, isHuman }));
  }, [dispatch, deckId, count, playerId, isHuman]);

  useEffect(() => {
    if (isRobotsTurn) {
      const index = getRandomNumber(0, player.cards.length);
      const card = player.cards[index];
      setTimeout(
        () =>
          handleThrowCard({ value: card.value, images: card.images, index }),
        1000
      );
    }
  }, [isHuman, isRobotsTurn, handleThrowCard, player]);

  if (!player) return <Loader />;

  const playerSum = player.points.reduce((a, b) => a + b, 0);

  return (
    <div
      className={classNames(
        CLASS,
        createClassName([CLASS, PLAYER_POSITION[playerId]])
      )}
    >
      <div>
        <p>{player.name}</p> <p>Score: {playerSum}</p>
      </div>
      <div className={createClassName([CLASS, "cards"])}>
        {player.cards.map((i, index) => (
          <Card
            onClick={() =>
              handleThrowCard({ value: i.value, images: i.images, index })
            }
            position={position}
            card={i}
            index={index}
            key={nanoid()}
            isFaceDown={!player.isHuman}
          />
        ))}
      </div>
    </div>
  );
}

Player.propTypes = {
  position: PropTypes.string.isRequired,
  deckId: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isHuman: PropTypes.bool.isRequired,
};

export default Player;
