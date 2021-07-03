import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CompletedSchedule from "../../../components/CompletedSchedule";
import {getTodos} from "../../../services/TodoService";

function SchedulePage() {

    const [todos, setTodos] = useState({todos:[], currentTodo:""});

    useEffect(() =>{
      return getTodos().then(function({ data }) {
        const completedtodos = data.filter(item => item.completed)
        return setTodos({ todos: completedtodos });
      });
    },[]);
   
    return (
        <div className ="TodoMain">
            <CompletedSchedule todos={todos} />
        </div>  
    )
}

export default SchedulePage
