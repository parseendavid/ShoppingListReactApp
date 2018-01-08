import expect from "expect";
import React from "react";
import thunk from "redux-thunk";
import axiosConfig from "../../extras/axios_config";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import {SUCCESS, FAILURE, Login_User, SignUp_User, FETCH_JWT_TOKEN} from "../index";

const middleware = [thunk];
const mockAxios = new MockAdapter(axiosConfig);
const mockStore = configureMockStore(middleware);
const userData = {email: "user1@gmail.com", password: "password"};


describe('Tests For Login Action.', () => {
    afterEach(() => {
        mockAxios.reset();
    });
    // Testing  SUCCESS
    it('should sign up user successfully', () => {
        const response = {
            message: "User 1 has been created.",
        };
        mockAxios.onPost('/auth/register/').reply(200, response);

        const expectedActions = [
            {type: SUCCESS},
        ];

        const store = mockStore({user: {}});
        store.dispatch(SignUp_User(userData)).then(()=>{
            const dispatchedActions = store.getActions();
            const actionTypes = dispatchedActions.map(action => {
               return{"type":action.type};
            });
            expect(actionTypes).toEqual(expect.arrayContaining(expectedActions));
        });

    });
    it('should log in user successfully', () => {
        const response = {
            message: "User 1 has been created.",
            token: "MyDummyToken"
        };
        mockAxios.onPost('/auth/login/').reply(200, response);

        const expectedActions = [
            {type: SUCCESS},
            {type: FETCH_JWT_TOKEN}
        ];

        const store = mockStore({user: {}});
        store.dispatch(Login_User(userData)).then(()=>{
            const dispatchedActions = store.getActions();
            const actionTypes = dispatchedActions.map(action => {
               return{"type":action.type};
            });
            expect(actionTypes).toEqual(expect.arrayContaining(expectedActions));
        });

    });
    //  Testing FAILURE
    it('should catch errors on user sign up successfully', () => {
        const response = {
            message: "User already exists...",
        };
        mockAxios.onPost('/auth/register/').reply(400, response);

        const expectedActions = [
            {type: FAILURE},
        ];

        const store = mockStore({user: {}});
        store.dispatch(SignUp_User(userData)).then(()=>{
            const dispatchedActions = store.getActions();
            const actionTypes = dispatchedActions.map(action => {
               return{"type":action.type};
            });
            expect(actionTypes).toEqual(expect.arrayContaining(expectedActions));
        });

    });
    it('should catch errors on user log in successfully', () => {
        const response = {
            message: "Wrong Credentials....",
        };
        mockAxios.onPost('/auth/login/').reply(400, response);

        const expectedActions = [
            {type: FAILURE},
        ];

        const store = mockStore({user: {}});
        store.dispatch(Login_User(userData)).then(()=>{
            const dispatchedActions = store.getActions();
            const actionTypes = dispatchedActions.map(action => {
               return{"type":action.type};
            });
            expect(actionTypes).toEqual(expect.arrayContaining(expectedActions));
        });

    });

});