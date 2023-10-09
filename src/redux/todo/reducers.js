import { ADD_TODO, UPDATE_TODO_BOARD, UPDATE_TODO_LIST } from "../actionType"; // Use the correct action type

const initialState = {
  Boards: JSON.parse(localStorage.getItem('boards')) || [],
  todoList: [],
  // ActiveBoardsID: 1,
};

const TodoReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TODO: // Use the correct action type
    const newTodo = [...state.todoList[0]["taskList"], payload];
      return {
        ...state,
        todoList: [...newTodo],
      };
    case UPDATE_TODO_LIST:
        const UpdateTodoList = payload
        return {
            ...state,
            todoList:UpdateTodoList
        }
    case UPDATE_TODO_BOARD:
        const newBoard = payload;  
           return {
            ...state,
            Boards:newBoard
        }
    default:
      return state; // Return the current state for unknown actions
  }
};

export default TodoReducers;
