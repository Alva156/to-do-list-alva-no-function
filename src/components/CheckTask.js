import React from "react";
import * as FaIcons from "react-icons/fa";

function CheckTask({ id, checkItem }) {
  return (
    <button onClick={() => checkItem(id)} className="check-btn">
      <FaIcons.FaCheck />
    </button>
  );
}

export default CheckTask;
