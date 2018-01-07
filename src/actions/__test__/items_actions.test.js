import expect from "expect";
import React from "react";
import thunk from "redux-thunk";
import axiosConfig from "../../extras/axios_config";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import {
    SUCCESS,
    FAILURE,
    Fetch_Shopping_List_Items,
    FETCH_SHOPPING_LIST_ITEMS

} from "../index";

const middleware = [thunk];
const mockAxios = new MockAdapter(axiosConfig);
const mockStore = configureMockStore(middleware);

const localStorageMock = {
    getItem: (name) => {
        return "Dummy";
    },
    removeItem: () => {
    }
};

global.localStorage = localStorageMock;

describe('Tests For list Action.', () => {
    afterEach(() => {
        mockAxios.reset();
    });
    // Testing  SUCCESS
    it('Fetches lists successfully.', () => {
        const response = {
            "shopping_lists": [
                {
                    "date_modified": "Sat, 06 Jan 2018 07:22:52 GMT",
                    "id": 5,
                    "list_name": "home"
                }
            ]
        };
        mockAxios.onGet('/list/5/items').reply(200, response);

        const expectedActions = [
            {type: SUCCESS},
            {type: FETCH_SHOPPING_LIST_ITEMS}
        ];

        const store = mockStore({lists: {}});
        store.dispatch(Fetch_Shopping_List_Items(5)).then(() => {
            const dispatchedActions = store.getActions();
            const actionTypes = dispatchedActions.map(action => {
                return {"type": action.type};
            });
            expect(localStorageMock.getItem.toHaveBeenCalled);
            expect(actionTypes).toEqual(expect.arrayContaining(expectedActions));
        });

    });
});