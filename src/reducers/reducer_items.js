import {FETCH_SHOPPING_LIST_ITEMS} from "../actions"
export default function(state={}, action){
    switch(action.type){
        case FETCH_SHOPPING_LIST_ITEMS:
            return action.payload.data["items"]
        default:
            return state
    }
}