import React from "react";
import "./components.css";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import CheckTask from "./CheckTask";

function List({ items, removeItem, editItem, checkItem }) {
  return (
    <div className="task-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="task-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <CheckTask checkItem={() => checkItem(id)} />
              <EditTask editItem={() => editItem(id)} />
              <DeleteTask removeItem={() => removeItem(id)} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
