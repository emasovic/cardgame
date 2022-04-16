import React from "react";
import { createClassName } from "lib/utils";

import "./Loader.scss";

const CLASS = "Loader";

function Loader() {
  return (
    <svg className={CLASS} viewBox="0 0 50 50">
      <circle
        className={createClassName([CLASS, "path"])}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></circle>
    </svg>
  );
}

export default Loader;
