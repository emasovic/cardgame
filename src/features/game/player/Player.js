import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "./components/Card";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import classNames from "classnames";
import { createClassName, getRandomNumber } from "lib/utils";
import { CARD_VALUES, PLAYER_POSITION } from "lib/const";
import {
  selectPlayer,
  selectTotal,
  throwCard,
} from "features/game/redux/gameSlice";

import "./Player.scss";

const CLASS = "Player";

function Player({ id }) {
  const dispatch = useDispatch();
  const { currentPlayerIndex, pool } = useSelector((state) => state.game);
  const player = useSelector((state) => selectPlayer(state, id));
  const total = useSelector(selectTotal);
  const { cards, isHuman, points, position, name, index } = player;
  const isPlayersTurn = currentPlayerIndex === index;
  const isRobotsTurn = !isHuman && isPlayersTurn;

  const handleThrowCard = useCallback(
    (payload) => {
      const currentPlayer = { ...player };
      const poolItem = {
        cardValue:
          CARD_VALUES[payload.card?.value] || Number(payload.card?.value),
        images: payload.card.images,
        id: payload.id,
        index: currentPlayer.index,
      };

      currentPlayer.cards = currentPlayer.cards.filter(
        (c, index) => index !== payload.card.index
      );

      const newIndex =
        total > currentPlayer.index + 1 ? currentPlayerIndex + 1 : 0;

      const newPool = [...pool, poolItem];

      dispatch(
        throwCard({
          player: currentPlayer,
          currentPlayerIndex: newIndex,
          pool: newPool,
        })
      );
    },
    [player, pool, dispatch, currentPlayerIndex, total]
  );

  useEffect(() => {
    if (isRobotsTurn) {
      const index = getRandomNumber(0, cards.length);
      const card = cards[index];
      setTimeout(() => handleThrowCard({ card: { ...card, index }, id }), 1000);
    }
  }, [isHuman, isRobotsTurn, handleThrowCard, id, cards]);

  const cardClassName = createClassName([CLASS, "cards"]);
  const isDisabled = isRobotsTurn || !isPlayersTurn;
  return (
    <div
      className={classNames(
        CLASS,
        createClassName([CLASS, PLAYER_POSITION[index]])
      )}
    >
      <div className={classNames(cardClassName, isDisabled && "disabled")}>
        <div className={createClassName([CLASS, "stats"])}>
          <span
            className={classNames(
              createClassName([CLASS, "stats", "name"]),
              isHuman && createClassName([CLASS, "stats", "name", "human"])
            )}
          >
            {name}
          </span>
          <p>Score: {points}</p>
        </div>
        {cards.map((i, index) => (
          <Card
            onClick={() => handleThrowCard({ card: { ...i, index }, id })}
            position={position}
            card={i}
            key={nanoid()}
            isFaceDown={!isHuman}
          />
        ))}
      </div>
    </div>
  );
}

Player.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Player;
