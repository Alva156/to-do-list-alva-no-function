import React from "react";
import * as FaIcons from "react-icons/fa";

function CheckTask({ id, checkItem, isCompleted }) {
  return (
    <button onClick={() => checkItem(id)} className="check-btn">
      {isCompleted ? <FaIcons.FaTimes /> : <FaIcons.FaCheck />}
    </button>
  );
}

export default CheckTask;
