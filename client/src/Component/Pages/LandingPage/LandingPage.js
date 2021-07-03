import React, { useState ,useEffect } from "react";
import { siteTitle } from "../../Config";
// import axios from "axios";
import { withRouter } from "react-router-dom";
import TodoMain from "../../../components/TodoMain";
import TodoList from "../../../components/TodoList";
import TodoInsert from "../../../components/TodoInsert";
import {
  getTodos,
} from "../../../services/TodoService";
import axios from "axios";

function LandingPage(props) {
  const [todos, setTodos] = useState({todos:[], currentTodo:""});

  useEffect(() => {
    // axios.get("/api/hello").then((response) => console.log(response.data));
    // document.title = siteTitle; //Title 변경.
    getTodos().then(function({ data }) {
      setTodos({ todos: data });
    });
    
  }, []);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };
  
  return (
    <TodoMain>
      <button onClick={onClickHandler} >logout </button>
      <TodoInsert/>
      <TodoList todo ={todos.todos} />
    </TodoMain>
  );
}

export default withRouter(LandingPage);
