import {FETCH_SHOPPING_LISTS} from "../actions"
import _ from 'lodash'

export default function(state={}, action){
    switch(action.type){
        case FETCH_SHOPPING_LISTS:
            return _.mapKeys(action.payload.data.shopping_lists, 'id')
        default:
            return state
    }
}