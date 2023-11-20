import { createStore, combineReducers } from 'redux';
import noteReducer from './Reducer'; // Đường dẫn đến reducer của bạn

const rootReducer = combineReducers({
  note: noteReducer,
});

const store = createStore(rootReducer);

export default store;
