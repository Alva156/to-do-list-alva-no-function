import React from "react";
import "./List.css";
import * as FaIcons from "react-icons/fa";

function List({ items }) {
  return (
    <div className="task-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="task-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button className="edit-btn">
                <FaIcons.FaEdit />
              </button>

              <button className="delete-btn">
                <FaIcons.FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
