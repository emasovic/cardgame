import React from "react";
import PropTypes from "prop-types";
import Image from "components/image/Image";
import faceDown from "assets/images/facedown.png";
import classNames from "classnames";
import { createClassName } from "lib/utils";
import { POSITION } from "lib/const";

import "./Card.scss";

const CLASS = "Card";

const POISTION_CLASSES = {
  [POSITION.top]: createClassName([CLASS, "facedown", "left"]),
  [POSITION.right]: createClassName([CLASS, "facedown", "right"]),
  [POSITION.left]: createClassName([CLASS, "facedown", "left"]),
};

function Card({ card, onClick, position, isFaceDown }) {
  const src = isFaceDown ? faceDown : card.images.png;

  return (
    <Image
      src={src}
      alt={card.suit}
      className={classNames(
        CLASS,
        isFaceDown &&
          classNames(
            createClassName([CLASS, "facedown"]),
            POISTION_CLASSES[position]
          )
      )}
      onClick={onClick}
    />
  );
}

Card.defaultProps = {
  isFaceDown: false,
  onClick: () => {},
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isFaceDown: PropTypes.bool.isRequired,
};

export default Card;
