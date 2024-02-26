import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./List";
import Alert from "./Alert";
import Header from "./Header";
import AddTask from "./AddTask";
import { getLocalStorage } from "./localStorage";

function App() {
  const dummyTasks = [
    { id: "1", title: "Buy Mom and Dad gifts" },
    { id: "2", title: "Basketball at Kapatiran" },
    { id: "3", title: "Eat Hard Boiled Eggs" },
    { id: "4", title: "Basketball at San Mateo" },
    { id: "5", title: "Sleep @9pm" },
    { id: "6", title: "Wake up @10am" },
    { id: "7", title: "Wake up @11am" },
  ];
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage(dummyTasks));
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {};

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
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
      {alert.show && (
        <Alert {...alert} removeAlert={() => showAlert()} list={list} />
      )}
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList} disabled>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
