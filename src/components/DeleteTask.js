import React from "react";
import * as FaIcons from "react-icons/fa";
function DeleteTask({ id, removeItem }) {
  return (
    <button onClick={() => removeItem(id)} className="delete-btn">
      <FaIcons.FaTrash />
    </button>
  );
}

export default DeleteTask;
