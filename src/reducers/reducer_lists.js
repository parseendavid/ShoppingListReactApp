import {FETCH_SHOPPING_LISTS} from "../actions"
export default function(state={}, action){
    switch(action.type){
        case FETCH_SHOPPING_LISTS:
            return action.payload.data["shopping_lists"]
        default:
            return state
    }
}