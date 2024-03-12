import React from "react";
import * as FaIcons from "react-icons/fa";
function EditTask({ id, editItem }) {
  return (
    <button onClick={() => editItem(id)} className="edit-btn">
      <FaIcons.FaEdit />
    </button>
  );
}

export default EditTask;
