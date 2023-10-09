import React, { useEffect, useState } from "react";
import Boards from "../components/Boards";
import "./Todo.css"
import TodoList from "../components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTodoBoard } from "../redux/todo/action";
export default function Todo({isDarkMode}) {
  const [boards,setBoards] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
   let Boards = [
      {
        id: 1,
        title: "Board 1",
        isActive: true,
        taskList: [
          {
            id: 1,
            title: "completed task",
            isCompleted: true,
          },
          {
            id: 2,
            title: "Doing homework",
            isCompleted: false,
          },
        ],
      }
    ];
    setBoards(Boards)
    
    let board = JSON.parse(localStorage.getItem("boards"))||Boards||[];
    localStorage.setItem("boards",JSON.stringify(board))
    dispatch(UpdateTodoBoard(board))
  },[])
  // const data = JSON.parse(localStorage.getItem("boards"))

  // const [Board,setBoard] = React.useState(data||[...boards]);
  // const {Boards,TodoList} = useSelector(store=>store)
  return (
    <>
      <div className="w-11/12 box-slate bg-white shadow-lg shadow-zinc-400/50 m-auto my-7 rounded-xl border-2 border-gray-400 ">
        <div className="over-flow-auto max-w-full:" id="board">
      { (boards && boards.length) &&  <Boards />}
        </div>
      </div>
      
      <section
        className={`flex w-11/12 box-slate bg-white shadow-lg shadow-slate-700/50 m-auto my-7 rounded-xl border-2 border-gray-400 justify-between p-4 text-xl text-center`}
        id="show-todo-component"
      >
       { boards && boards.length &&  <TodoList />}
      </section>
    </>
  );
}
