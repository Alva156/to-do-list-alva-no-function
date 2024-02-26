export const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [
      { id: new Date().getTime().toString(), title: "Buy Mom and Dad gifts" },
      {
        id: new Date().getTime().toString() + 1,
        title: "Basketball at Kapatiran",
      },
      {
        id: new Date().getTime().toString() + 1,
        title: "Eat Hard Boiled Eggs",
      },
      {
        id: new Date().getTime().toString() + 1,
        title: "Basketball at San Mateo",
      },
      { id: new Date().getTime().toString() + 1, title: "Sleep @9pm" },
    ];
  }
};
