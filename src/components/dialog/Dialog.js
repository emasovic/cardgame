import React from "react";
import PropTypes from "prop-types";
import { createClassName } from "lib/utils";
import Button from "components/button/Button";

import "./Dialog.scss";

const CLASS = "Dialog";

function Dialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className={CLASS}>
      <div className={createClassName([CLASS, "modal"])}>
        {onClose && (
          <div className={createClassName([CLASS, "modal", "header"])}>
            <Button label="x" onClick={onClose} />
          </div>
        )}
        <div className={createClassName([CLASS, "modal", "body"])}>
          {children}
        </div>
      </div>
    </div>
  );
}

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Dialog;
