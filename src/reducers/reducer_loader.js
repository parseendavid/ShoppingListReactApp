import {REQUEST,SUCCESS,FAILURE} from "../actions";

export default function (state = {}, action) {
    switch (action.type) {
        case REQUEST:
            return true;
        case SUCCESS:
            return false;
        case FAILURE:
            return false;
        default:
            return false;
    }
}