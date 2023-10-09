

// src/redux/actions/todoActions.js
import { ADD_TODO,REMOVE_TODO, UPDATE_TODO_BOARD, UPDATE_TODO_LIST } from '../actionType';
const boards = localStorage.getItem('boards')||[];

export const addTodo = (payload) => {
    if(!boards.length){
        boards.push()
    }

    return {type:ADD_TODO,payload}
}
export const UpdateTodoList = (todoList)=>{
    return {type:UPDATE_TODO_LIST,payload:todoList}
}
export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});

export const UpdateTodoBoard = (updatedBoard)=>{
    console.log(updatedBoard)
    return {type:UPDATE_TODO_BOARD,payload:updatedBoard}
} 