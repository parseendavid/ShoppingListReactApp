import {combineReducers} from 'redux';
import ListsReducer from "./reducer_lists";
import ItemsReducer from "./reducer_items";
import TokenReducer from "./token_reducer";
import LoaderReducer from "./reducer_loader";

const rootReducer = combineReducers({
    course:"",
    token: TokenReducer,
    loading:LoaderReducer,
    lists: ListsReducer,
    items_details: ItemsReducer,
});

export default rootReducer;