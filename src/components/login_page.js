import React, { Component } from 'react';
import {Control, Form, Errors} from 'react-redux-form'
import axiosConfig from '../extras/axios_config'
import {withRouter, Redirect} from 'react-router-dom'
import _ from 'lodash'


import Navbar from "./nav"
import store from '../extras/store'
import {Login_User} from "../actions"

class LoginPage extends Component {
  handleSubmit(values) {
    store.dispatch(Login_User(values, this.props.history.push))
  }
  render() {
    const required = (val) => val && _.size(val); const length = (val) => _.size(val) > 6
    if(store.getState().token){
      return(
        <Redirect push to='/dashboard'/>
      )
    }
    else{
      return (
        <div>
      <Navbar text='sign up' icon='label_outline' link='/signup'/>
      <div className="badge">
        <div className="small_form container">
          <Form model="user_form" onSubmit={(val) => this.handleSubmit(val)}>
          <label><i className="default-text-color material-icons left">mail_outline</i></label>
          <Control.text type="email" placeholder="Email" model=".email" validators={{required}}/>
          <Errors className="errors" model="user.email"show="touched"messages={{required: 'Email is required'}}/>
          <label><i className="default-text-color material-icons left">lock_outline</i></label>
          <Control.text type="password" placeholder="Password" model=".password" validators={{required,length}} />
          <Errors className="errors" model="user.password"show="touched"messages={{required: 'Password is required',length:"Password should be atleast 6 characters long."}}/>
          <Control.reset className="btn grey left" model="user" type="reset">Reset</Control.reset>
          <button className="light-blue btn right">Submit</button>
          </Form>
        </div>
        </div>
      </div>
    );
  }
  }
}
export default LoginPage