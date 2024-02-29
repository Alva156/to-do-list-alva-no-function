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

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please enter value");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      showAlert(true, "success", "item added to the list");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <Header />
      <AddTask name={name} setName={setName} handleSubmit={handleSubmit} />
      {alert.show && (
        <Alert {...alert} removeAlert={() => showAlert()} list={list} />
      )}
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} />
          <button className="clear-btn">clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
