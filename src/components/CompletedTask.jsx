import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTodoBoard, UpdateTodoList } from "../redux/todo/action";
function CompletedTask() {
  const todos = useSelector(store=>store.todoList);
  const Board = useSelector(store=>store.Boards);
  const [completedTask,setCompletedTask] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    const completedTaskList = todos[0]['taskList']?.filter((todo) => {
      return todo.isCompleted;
    });
    setCompletedTask(completedTaskList)
  },[todos[0]?.taskList])

  const DeleteTodo = (id)=>{
    const updateTodo = todos[0]["taskList"].filter(b =>  b.id != id);

    const updatedBoard = Board.map((board) => {
      if (board.id == todos[0]["id"]) {
        board.taskList = [...updateTodo];
      }
      return board;
    });

    dispatch(UpdateTodoList(updateTodo));
    dispatch(UpdateTodoBoard(updatedBoard));

    localStorage.setItem("boards", JSON.stringify(updatedBoard));
  }

  return  (
    <>
      <div
        id="completed"
        className="w-1/3 border-l-2 rounded-lg px-4 border-gray-400"
      >
        <div id="title" className="">
          <h3 className="text-3xl text-gray-500 font-bold font-mono">
            Completed Tasks
          </h3>
          <hr />
        </div>
        <div id="task-list" className="p-2 overflow-y-auto max-h-52">
          { completedTask.length==0?<h1>No todos completed! Please complete one </h1>:completedTask?.map((board) => {
              return (
                <div
                  key={board.id}
                  className="flex justify-between text-justify p-3 border my-3 border-sky-500 rounded-lg hover:scale-105 delay-350 hover:bg-indigo-900 bg-green-400 text-zinc-600 font-bold line-through hover:text-white transition-all ease-in-out hover:cursor-pointer"
                >
                  <h3 className="">{board.title}</h3>
                  <button className="content-center text-2xl font-bold text-red-400 w-auto mx-2 min-w-fit min-h-fit">
                    <AiFillDelete className="hover:cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110  " onClick={()=>DeleteTodo(board.id)}/>
                    {/* Delete */}
                  </button>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}

export default CompletedTask;
