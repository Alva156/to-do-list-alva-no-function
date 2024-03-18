import React from "react";

function TaskCount({ count }) {
  return (
    <div className="task-count">
      <h3>Total Tasks: {count}</h3>
    </div>
  );
}

export default TaskCount;
