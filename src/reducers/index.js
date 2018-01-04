import { combineReducers } from 'redux';
import {reducer as formReducer} from "redux-form"
import {combineForms,createForms } from 'react-redux-form';

import ListsReducer from "./reducer_lists"
import ItemsReducer from "./reducer_items"
import TokenReducer from "./token_reducer"

const initialUserState={}
const initialListState={'listname':''}
const initialItemState={'itemname':'','quantity':1,'price':0}


const rootReducer = combineReducers({
  token : TokenReducer,
  lists : ListsReducer,
  items : ItemsReducer,
  ...createForms({user_form: initialUserState,list_form:initialListState,item_form:initialItemState,}),
});

export default rootReducer;