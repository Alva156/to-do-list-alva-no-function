import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Alert from "./components/Alert";
import Header from "./components/Header";
import AddTask from "./components/AddTask";

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
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "danger", "Item removed");
  };
  const checkItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "success", "Item completed");
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const clearList = () => {
    setList([]);
    showAlert(true, "danger", "All entries removed");
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
      showAlert(true, "success", "Item edited");
    } else {
  
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      showAlert(true, "success", "Item added to the list");
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

          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
