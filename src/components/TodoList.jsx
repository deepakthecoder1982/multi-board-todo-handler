import React, { useEffect, useState } from "react";
import NewTask from "../components/NewTask";
import CompletedTask from "../components/CompletedTask";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTodoBoard, UpdateTodoList, addTodo } from "../redux/todo/action";
function TodoList() {
  const {todoList,Boards} = useSelector(store=>store);
  const [todos,setTodos] = useState([]);
  const [Input,setInput] = useState('');
  const dispatch = useDispatch();
  
  useEffect(()=>{
    let filterTodos = Boards?.filter(board=>{
      if(board.isActive){
        return board.taskList;
      }
    })
    const activeTodos = Boards?.filter(board=>board.isActive);
    dispatch(UpdateTodoList(activeTodos))
    let filterTodo = [...filterTodos] 
    setTodos(filterTodo)
  },[Boards])

  const handleTodo = (e)=>{
    e.preventDefault();
    if(!Input){
      alert("Please Enter a title...")
      return;
    }
    let maxId = 0;
    todos.forEach(todo=>{
        if(todo.isActive){
         todos.length && todo["taskList"].forEach((t)=>{
              maxId = Math.max(maxId,t.id);
          })
        }
    })

    const payload  = {
      id:maxId + 1,
      title:Input,
      isCompleted:false
    }
    const updatedBoard = Boards.map((board=>{
      if(board.id == todoList[0]['id'] ){
        board.taskList = [...board.taskList,payload] 
      }
      return board
    }))

    console.log(updatedBoard)

    dispatch(UpdateTodoBoard(updatedBoard))
    localStorage.setItem("boards", JSON.stringify(updatedBoard)); 
    dispatch(addTodo(payload))
    
    setInput("");
  }
  
  return !Boards.length ? <h1>No Boards Available!, Please add one</h1>:(
    <>
      {todoList[0]?.taskList?.length>=0 && <NewTask  />}
      <div id="input" className="px-4">
        <h3 className="text-3xl text-gray-500 font-bold ">
          Board 1 View
          <hr />
        </h3>
        <form action="#" className="my-5 " onSubmit={handleTodo}>
          <input
            type="text"
            placeholder="Enter the task.."
            className="border-2 rounded-lg px-3 font-mono py-3 border-gray-400 w-5/6 focus:border-sky-300
              focus:outline-none focus:outline focus:shadow-md text-zinc-600"
              value={Input}
              onChange={(e)=>setInput(e.target.value)}
          />
          <button
            type="submit"
            value="Add"
            className="border-2 border-gray-500 width-screen px-8 py-2 rounded-lg my-4 bg-indigo-900 text-white border-none  "
          >
            <span className="font-mono font-extrabold"> Add Todo 🔥</span>
          </button>
        </form>
      </div>
      {todoList[0]?.taskList?.length>=0 &&  <CompletedTask todos={Boards} />}
    </>
  );
}

export default TodoList;
