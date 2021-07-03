import React from "react";
import "./TodoList.css";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todo}) => {

  const todolist = todo.map(item => <TodoListItem
    todosprop={todo}
    todoitem={item}
    key={item._id}
    />);

  return (
    <div className="TodoList">
      {todolist}      
    </div>
  );
};

export default TodoList;
