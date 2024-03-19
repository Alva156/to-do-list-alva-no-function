import React from "react";

function TaskCount({ list }) {
  const totalCount = list.length;

  const completedCount = list.filter((task) => task.completed).length;

  return (
    <div className="task-count">
      <h3>Total Tasks: {totalCount}</h3>
      <h4>Completed Tasks: {completedCount}</h4>
    </div>
  );
}

export default TaskCount;
