import React from "react";
import PropTypes from "prop-types";

import "./Button.scss";

const CLASS = "Button";

function Button({ label, onClick, ...props }) {
  return (
    <button className={CLASS} onClick={onClick} {...props}>
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
