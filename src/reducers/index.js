import { combineReducers } from 'redux';
import {reducer as formReducer} from "redux-form"
import ListsReducer from "./reducer_lists"
import ItemsReducer from "./reducer_items"

const rootReducer = combineReducers({
  lists : ListsReducer,
  items : ItemsReducer,
  form : formReducer
});

export default rootReducer;
