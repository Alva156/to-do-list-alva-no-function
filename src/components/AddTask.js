import React from "react";
import "../App.css";

function AddTask({ name, setName, handleSubmit, isEditing }) {
  return (
    <form className="grocery-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          className="task-input"
          placeholder="Add task"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          {isEditing ? "Edit" : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default AddTask;
