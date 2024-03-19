import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Alert from "./components/Alert";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskCount from "./components/TaskCount";

import { getLocalStorage } from "./localStorage";

function App() {
  // const dummyTasks = [
  //   { id: "1", title: "Buy Mom and Dad gifts" },
  //   { id: "2", title: "Basketball at Kapatiran" },
  //   { id: "3", title: "Eat Hard Boiled Eggs" },
  //   { id: "4", title: "Basketball at San Mateo" },
  //   { id: "5", title: "Sleep @9pm" },
  //   { id: "6", title: "Wake up @10am" },
  //   { id: "7", title: "Wake up @11am" },
  // ];

  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "danger", "Task removed");
  };
  const checkItem = (id) => {
    showAlert(true, "success", "Task completed");
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const clearList = () => {
    setList([]);
    showAlert(true, "danger", "All tasks removed");
  };
  const clearCompletedTasks = () => {
    const completedTasksExist = list.some((item) => item.completed);
    if (completedTasksExist) {
      setList(list.filter((item) => !item.completed));
      showAlert(true, "success", "Completed tasks cleared");
    } else {
      showAlert(true, "danger", "There are no completed tasks");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Task edited");
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        completed: false,
      };

      setList([...list, newItem]);
      setName("");
      showAlert(true, "success", "Task added to the list");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <Header />
      <AddTask
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />

      <TaskCount list={list} />

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
        </div>
      )}
    </section>
  );
}

export default App;
