import React, { useEffect } from "react";
import "./components.css";

function Alert({ type, msg, removeAlert, list }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [list, removeAlert]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
}

export default Alert;
