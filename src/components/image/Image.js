import React from "react";
import PropTypes from "prop-types";

function Image({ src, alt, ...rest }) {
  return <img src={src} alt={alt} {...rest} />;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Image;
