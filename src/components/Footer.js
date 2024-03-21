import React from "react";

function Footer({ list }) {
  const totalCount = list.length;

  const completedCount = list.filter((task) => task.completed).length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="task-count">
      <h3>
        You have a total of {totalCount} tasks in your list, and you already
        completed {completedCount} tasks, which is {percentage}%
      </h3>
    </div>
  );
}

export default Footer;
