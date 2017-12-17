import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter,Route} from "react-router-dom"
import promise from "redux-promise"

import HomePage from './components/home_page';
import LoginPage from './components/login_page';
import SignUpPage from './components/sign_up_page';
import DashboardPage from './components/dashboard_page';
import DetailsPage from './components/details_page';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
  <BrowserRouter>
    <div>
      <Route path="/dashboard" component={DashboardPage}/>
      <Route path="/details/:name" component={DetailsPage}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/signup" component={SignUpPage}/>
      <Route exact path="/" component={HomePage}/>
    </div>
  </BrowserRouter>
  </Provider>
  , document.querySelector('.container')
);