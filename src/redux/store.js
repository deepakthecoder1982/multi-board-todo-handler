import { createStore, applyMiddleware } from 'redux';
import TodoReducers from './todo/reducers';
import {thunk} from 'redux-thunk'; // Correct import statement
const store = createStore(TodoReducers, applyMiddleware(thunk));

export default store;
