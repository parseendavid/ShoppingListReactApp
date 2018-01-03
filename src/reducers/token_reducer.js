import {FETCH_JWT_TOKEN} from "../actions";

export default function (state = "", action) {
    switch (action.type) {
        case FETCH_JWT_TOKEN:
            localStorage.setItem('TOKEN', action.payload.data.token);
            return action.payload.data.token;
        default:
            return state;
    }
}