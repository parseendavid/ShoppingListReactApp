import {combineReducers} from 'redux';
import ListsReducer from "./reducer_lists";
import ItemsReducer from "./reducer_items";
import TokenReducer from "./token_reducer";

const rootReducer = combineReducers({
    course:"",
    token: TokenReducer,
    lists: ListsReducer,
    items: ItemsReducer,
    // ...createForms({user_form: initialUserState, list_form: initialListState, item_form: initialItemState,}),
});

export default rootReducer;