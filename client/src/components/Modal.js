import React, { useState,useEffect } from "react";
import "./Modal.css";
import {
  updataeTodos,
  addTodos,
  getTodos,
} from "../services/TodoService";
import { AiOutlineClose } from "react-icons/ai";

const Modal = (props) => {
  const { open, close, header,id} = props;
  const [todos, setTodos] = useState({todos:[], currentTodo:""});

  useEffect(() =>{
    return getTodos().then(function({ data }) {
      setTodos({ todos: data });
    });
  },[]);

  const handleChange = (e) => {
    setTodos({ currentTodo: e.target.value });
    console.log(e.target.value )
  };
  

  const handleSubmit = async (e) => {
    try {
        const { data } = await addTodos({ todo: todos.currentTodo });
        setTodos(data);
        setTodos({ todos, currentTodo: "" });
    } catch (error) {
        console.log(error);
    }
  };

  

  const handletextupdate = async (id) => {
    try{
          const index = todos.todos.findIndex((task) => task._id === id); //index를 반환함
          todos.todos[index] = { ...todos[index] };
          todos.todos[index].todo = 
          setTodos({ todos });
          await updataeTodos(id, {
            todo: todos.todos[index].todo,
          });
    }catch(err){
      console.log(err)
    }
  }


 return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <div className="modal_main"  >
          <button className="close" onClick={close}>
            <AiOutlineClose size="31" color="white"/>
          </button>
          <header className="modal_header">{header}</header>
          <form className="modal_input_main" >
            <textarea className="modal_input" 
            placeholder={header === "스케줄 수정" ? "수정 할 내용을 입력하세요" : "할 일을 입력하세요"}
            value={todos.currentTodo} onChange={handleChange} />
            <button type="submit" className="save" 
            onClick={header === "스케줄 수정" & open ? handletextupdate(id) : handleSubmit}>
              save
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};
export default Modal;
