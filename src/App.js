import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Alert from "./components/Alert";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";

import { getLocalStorage } from "./localStorage";
// const dummyTasks = [
//   { id: "1", title: "Buy Mom and Dad gifts" },
//   { id: "2", title: "Basketball at Kapatiran" },
//   { id: "3", title: "Eat Hard Boiled Eggs" },
//   { id: "4", title: "Basketball at San Mateo" },
//   { id: "5", title: "Sleep @9pm" },
//   { id: "6", title: "Wake up @10am" },
//   { id: "7", title: "Wake up @11am" },
// ];

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    const sortList = () => {
      let sortedList = [...list];
      switch (sortType) {
        case "default":
          sortedList.sort((a, b) => parseInt(a.id) - parseInt(b.id));
          break;
        case "alphabetical":
          sortedList.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "completeTop":
          sortedList.sort((a, b) => b.completed - a.completed);
          break;
        case "incompleteTop":
          sortedList.sort((a, b) => a.completed - b.completed);
          break;

        default:
          break;
      }
      return sortedList;
    };

    setList(sortList());
  }, [sortType, list]);

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });

    clearTimeout(window.alertTimeout);

    if (show) {
      window.alertTimeout = setTimeout(() => {
        setAlert({ show: false, type: "", msg: "" });
      }, 3000);
    }
  };

  const removeItem = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this task?"
    );
    if (isConfirmed) {
      setList(list.filter((item) => item.id !== id));
      showAlert(true, "danger", "Task removed");
    }
  };
  const checkItem = (id) => {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    updatedList.sort((a, b) => {
      if (a.completed === b.completed) {
        return a.title.localeCompare(b.title);
      }
      return a.completed ? -1 : 1;
    });

    setList(updatedList);
    showAlert(
      true,
      updatedList.find((item) => item.id === id).completed
        ? "success"
        : "danger",
      updatedList.find((item) => item.id === id).completed
        ? "Task completed"
        : "Task marked as not complete"
    );
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const clearList = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove all tasks?"
    );
    if (isConfirmed) {
      setList([]);
      showAlert(true, "danger", "All tasks removed");
    }
  };
  const clearCompletedTasks = () => {
    const completedTasksExist = list.some((item) => item.completed);
    if (completedTasksExist) {
      const isConfirmed = window.confirm(
        "Are you sure you want to remove all completed tasks?"
      );
      if (isConfirmed) {
        setList(list.filter((item) => !item.completed));
        showAlert(true, "success", "Completed tasks cleared");
      }
    } else {
      showAlert(true, "danger", "There are no completed tasks");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please enter value");
    } else {
      let tempTasks = [];
      if (isEditing) {
        tempTasks = list.map((item) => {
          if (item.id === editID) {
            return {
              ...item,
              title: name,
              id: item.id,
              completed: item.completed,
            };
          }
          return item;
        });
        setIsEditing(false);
        setEditID(null);
      } else {
        const newTask = {
          id: new Date().getTime().toString(),
          title: name,
          completed: false,
        };
        tempTasks = [newTask, ...list];
      }

      setName("");
      showAlert(true, "success", isEditing ? "Task updated" : "Task added");
      setList(tempTasks);
    }
  };

  return (
    <section className="section-center">
      <Header />
      <AddTask
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />

      <div className="sort-container">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="completeTop">Completed Tasks at Top</option>
          <option value="incompleteTop">Incomplete Tasks at Top</option>
        </select>
      </div>
      {alert.show && (
        <Alert {...alert} removeAlert={() => showAlert()} list={list} />
      )}

      {list.length > 0 && (
        <div className="grocery-container">
          <List
            items={list}
            removeItem={removeItem}
            editItem={editItem}
            checkItem={checkItem}
          />
          <button onClick={clearCompletedTasks} className="clear-btn">
            Remove All Completed Tasks
          </button>
          <button className="clear-btn" onClick={clearList}>
            remove all tasks
          </button>

          <Footer list={list} />
        </div>
      )}
    </section>
  );
}

export default App;
