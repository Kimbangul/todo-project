import axios from "axios";
const apiUrl = "http://localhost:5000/api/todo";

export function getTodos(){
    return axios.get(apiUrl);
    
}

export function addTodos(todo){
    return axios.post(apiUrl,todo);
}

export function updataeTodos(id,todo){
    return axios.put(apiUrl+"/"+id , todo);
}

export function deleteTodos(id){
    return axios.delete(apiUrl+"/"+id);
}
