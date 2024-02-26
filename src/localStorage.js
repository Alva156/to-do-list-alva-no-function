export const getLocalStorage = (dummyTasks) => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return dummyTasks;
  }
};
