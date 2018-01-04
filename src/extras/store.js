import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reisi from "redux-immutable-state-invariant";
import thunk from 'redux-thunk';
import reducers from '../reducers';


const initialState = {
    token: localStorage.getItem('TOKEN') || ""
};
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(reisi(),thunk)));

export default store;