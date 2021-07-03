import React, { useState } from "react";
import "./TodoListItem.css";
import { MdEdit } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdLens } from "react-icons/md";
import { MdPanoramaFishEye } from "react-icons/md";
import cn from "classnames";
import Modal from "./Modal";
import {
  updataeTodos,
  deleteTodos,
} from "../services/TodoService";

const CompletedItem = ({todositem}) => {
    const { _id, todo, completed } = todositem;
  
    const [modalOpen, setModalOpen] = useState(false);
    const [todos, setTodos] = useState({todos:[todositem], currentTodo:""});

    const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };

    const handleUpdate = async (currentTodo) => { //currentTask == _id
      const originalTodos = todos.todos;
      try {
          const origntodo = [...originalTodos];
          const index = origntodo.findIndex((todo) => todo._id === currentTodo); //index를 반환함
          origntodo[index] = { ...origntodo[index] };
          origntodo[index].completed = !origntodo[index].completed; //반전 역할 ! false -> true , true -> fasle
          setTodos({ origntodo });
          await updataeTodos(currentTodo, {
              completed: origntodo[index].completed,
          });
          window.location.href="/";
      } catch (error) {
          setTodos({ todos: originalTodos });
          console.log(error);
      }
  };
  
  const handleDelete = async (currentTodo) => {
      const originalTodos = todos.todos;
      try {
          const todositem = originalTodos.filter(
              (todo1) => todo1._id !== currentTodo
          );
          setTodos({ todositem });
          await deleteTodos(currentTodo);
          window.location.href="/";
         
      } catch (error) {
          setTodos({ todos: originalTodos });
          console.log(error);
      }
  };
  
  
    return (
      <div className="TodoListItem">
        <div className={cn("checkbox", { completed })} onClick={() => handleUpdate(_id)}>
          {completed ? <MdCheckCircle /> : <MdPanoramaFishEye />}
          <div className="todo">{todo}</div>
        </div>
  
        <div className="option">
          <div className="change" onClick={openModal}>
            <MdEdit />
          </div>
          <div className="remove" onClick={() => handleDelete(_id)}>
            <MdDelete />
          </div>
        </div>
        <div className="situation">
          <div
            className={cn("checkbox", { completed })}
            onClick={() =>  handleUpdate(_id)}
            checked ="checked"
            disabled ="disabled"
          >
            <MdLens />  
            {completed ? <span>완료!</span> : <span>진행 중</span>}
          </div>
        </div>
        <Modal open={modalOpen} close={closeModal} header="스케줄 수정"></Modal>
      </div>
    );
  };
  
  export default CompletedItem;