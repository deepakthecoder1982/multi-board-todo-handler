import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineLibraryAdd } from "react-icons/md";
import "./Boards.css";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTodoBoard, UpdateTodoList } from "../redux/todo/action";
function Boards() {
  const Board = useSelector(store=>store.Boards);

  const dispatch = useDispatch();

  const handleActiveBoard = (id) =>{
    const newBoard = Board.map(b=>{
      if(b.id == id){
        b.isActive = true;
      }else{
        b.isActive = false;
      }
      return b; 
    })
    const activeTodo = Board.filter(b => b.id == id);
   dispatch(UpdateTodoBoard(newBoard))
   dispatch(UpdateTodoList(activeTodo));
   console.log('activeBoard: ' , newBoard);
   localStorage.setItem("boards",JSON.stringify(newBoard))
  }
  const AddTodoBoard = ()=>{
    let maxId = 0;
    Board.forEach(todo=>{
          maxId = Math.max(maxId,todo.id);
    })

      let newBoard = {
        id:maxId+1,
        title:`Board ${maxId+1}`,
        isActive:Board.length===0,
        taskList: []
      }
      newBoard = [...Board,newBoard];
      dispatch(UpdateTodoBoard(newBoard))
      localStorage.setItem('boards',JSON.stringify(newBoard));
  }
  const DeleteTodo = (id)=>{
    let updatedBoard = Board.filter(b =>  b.id != id);
    let updatedBoardList = [...updatedBoard];
   console.log(updatedBoard);
    dispatch(UpdateTodoBoard(updatedBoardList))
    localStorage.setItem("boards", JSON.stringify(updatedBoardList));
  }
  return (
    <>
      <div
        className="w-auto mx-3 border-sky-500 flex my-2 overflow-y-auto  "
        id="boardNav"
      >
        {!Board.length?null: 
          Board?.map((board) => {
            return (
              <>
                <div
                  className={` ${
                    board.isActive ? ` text-white active` : null
                  } w-auto flex p-2 bg-white hover:cursor-pointer rounded-xl justify-around mx-2 shadow-inner hover:shadow-lg border font-bold content-center border-indigo-900 min-w-fit min-h-fit transition-all ease-linear delay-50 `}
                  style={{alignItems:'center'}}
                  id="boardEach"
                >
                  <p className="text-xl px-1 " onClick={()=>handleActiveBoard(board.id)}>{board.title}</p>
                  <p
                    className="text-xl px-1 text-blue-500"
                    id={board.isActive ? `active` : null}
                  >
                    {/* {board?.isActive ? "[active  ]" : null} */}
                  </p>
                  <button className="content-center text-2xl font-bold text-red-400 w-auto mx-2 min-w-fit min-h-fit">
                    <AiFillDelete  className="hover:cursor-pointer transition ease-in-out delay-300 hover:-translate-y-1 hover:scale-110  " onClick={()=>DeleteTodo(board.id)} />
                    {/* Delete */}
                  </button>
                </div>
              </>
            );
          })}
        <div
          id="container"
          className="w-auto flex p-2 bg-white hover:cursor-pointer rounded-xl justify-around mx-4 shadow-inner hover:shadow-lg border font-semibold border-sky-600 content-center text-lg active:bg-indigo-900 active:text-white max-w-xs max-h-10"
        >
          <p>Add New</p>
          <button className="flex justify-around content-center text-2xl font-bold text-blue-500 w-10 my-1 border-red-200 transition ease-in-out delay-300"  onClick={AddTodoBoard}>
            <MdOutlineLibraryAdd />
            {/* Delete */}
          </button>
        </div>
      </div>
    </>
  );
}

export default Boards;
