/* eslint import/no-named-as-default:  */  // --> OFF
import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";


import HomePage from './components/home_page';
import LoginPage from './components/login_page';
import SignUp from './components/sign_up_page';
import Dashboard from './components/dashboard';
import Details from './components/details';
import NotFound from './components/404';
import Logout from './components/logout';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/dashboard/add" component={Dashboard}/>
                <Route path="/list/:id" component={Details}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        );
    }
}


export default App;
