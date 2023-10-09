import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTodoBoard, UpdateTodoList } from "../redux/todo/action";

function NewTask() {
  const todos = useSelector((store) => store.todoList);
  const Boards = useSelector((store) => store.Boards);
  const [todo, setTodo] = useState([]);
  const [todoCompleted, setTodoCompleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const UpdatedTodos = todos[0]["taskList"].filter(t=>{
      return !t.isCompleted;
    })
    
    setTodo(UpdatedTodos);
  }, [todos[0]["title"]]);


  const handleTodoStatus = (id) => {
    setTodoCompleted(!todoCompleted);
    const updateStatus = todos[0]["taskList"].map((b) => {
      if (b.id == id) {
        b.isCompleted = true;
      }
      return b;
    });

    const updatedBoard = Boards.map((board) => {
      if (board.id == todos[0]["id"]) {
        board.taskList = [...updateStatus];
      }
      return board;
    });
    dispatch(UpdateTodoList(updateStatus));
    dispatch(UpdateTodoBoard(updatedBoard))
    localStorage.setItem("boards", JSON.stringify(updatedBoard));
  };

  const DeleteTodo = (id)=>{
    console.log(id)
    const updateStatus = todos[0]["taskList"].filter(b =>  b.id != id);
    console.log(updateStatus);
    const updatedBoard = Boards.map((board) => {
      if (board.id == todos[0]["id"]) {
        board.taskList = [...updateStatus];
      }
      return board;
    });
    dispatch(UpdateTodoList(updateStatus));
    dispatch(UpdateTodoBoard(updatedBoard))
    localStorage.setItem("boards", JSON.stringify(updatedBoard));
  }
  return (
    <div  
      id="new-task"
      className="w-1/3 border-r-2 rounded-lg px-4 border-gray-400"
    >
      <div className="title">
        <h3 className="text-3xl text-gray-500 font-bold font-mono">
          New Tasks
        </h3>
        <hr />
      </div>
      <div id="task-list" className="p-2 overflow-y-auto max-h-52 ">
        {!todo?.length ? (
          <h1>No Todos Available Please! Add one</h1>
        ) : (
          todo.map((task) => {
            return (
              <div
                key={task.id}
                className="flex justify-between text-justify p-3 border my-3 border-sky-500 rounded-lg hover:scale-105 delay-100 hover:bg-indigo-900 hover:text-white transition-all ease-in-out hover:cursor-pointer"
              >
                <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  className="mx-4 w-6 rounded-3xl"
                  checked={task?.isCompleted}
                  onClick={() => handleTodoStatus(task?.id)}
                />
                <h3 className="">{task.title}</h3>
                <button className="content-center text-2xl font-bold text-red-400 w-auto mx-2 min-w-fit min-h-fit">
                  <AiFillDelete className="hover:cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110" onClick={()=>DeleteTodo(task?.id)} />
                  {/* Delete */}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default NewTask;
