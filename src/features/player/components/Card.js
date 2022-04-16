import React from "react";
import PropTypes from "prop-types";
import Image from "components/image/Image";
import { POSITION } from "lib/const";
import faceDown from "assets/images/facedown.png";

import "./Card.scss";

const CLASS = "Card";

function Card({ card, index, position, onClick, isFaceDown }) {
  const src = isFaceDown ? faceDown : card.images.png;
  const props = {};

  if (isFaceDown) {
    position = position === POSITION.top ? POSITION.right : position;
    props.style = {
      position: "absolute",
      [position]: index * 30,
    };
  }
  return (
    <Image
      src={src}
      alt={card.suit}
      className={CLASS}
      onClick={onClick}
      {...props}
    />
  );
}

Card.defaultProps = {
  isFaceDown: false,
};

Card.propTypes = {
  onClick: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  isFaceDown: PropTypes.bool.isRequired,
};

export default Card;
