/* eslint no-case-declarations: 0 */  // --> OFF

import {FETCH_SHOPPING_LIST_ITEMS} from "../actions";
import _ from "lodash";
export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_SHOPPING_LIST_ITEMS:
            const items = _.mapKeys(action.payload.data.items, 'id');
            const parent = action.payload.data.list_details;
            return Object.assign({},state,{items,parent});

        default:
            return state;
    }
}