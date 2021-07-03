import React from "react";
import "./TodoMain.css";

const TodoMain = ({ children }) => {
  return (
    <div className="TodoMain">
      <div className="content">{children}</div>
    </div>
  );
};

export default TodoMain;
