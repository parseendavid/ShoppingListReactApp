import React, { Component } from 'react';
import _ from 'lodash'
import Navbar from "./nav"
import {Control,Errors, Form} from 'react-redux-form'

import store from '../extras/store'
import {SignUp_User} from "../actions"


export default class SignUp extends Component {
  handleSubmit(values) { 
    store.dispatch(SignUp_User(values, this.props.history.push))   
  }
  render() {
    const required = (val) => val && _.size(val); const length = (val) => _.size(val) > 6
    return (
      <div>
        <Navbar text='login' icon='input' link='/login'/>
        <div className="badge">
        <div className="small_form container">
          <Form model="user_form" onSubmit={(val) => this.handleSubmit(val)}>
          <label><i className="default-text-color material-icons left">account_box</i></label>
          <Control.text type="text" placeholder="Username" model=".username" validators={{required}}/>
          <Errors className="errors" model="user_form.username"show="touched"messages={{required: 'Username is required'}}/>
          <label><i className="default-text-color material-icons left">mail_outline</i></label>
          <Control.text type="email" placeholder="Email" model=".email" validators={{required}}/>
          <Errors className="errors" model="user_form.email"show="touched"messages={{required: 'Email is required'}}/>
          <label><i className="default-text-color material-icons left">lock_outline</i></label>
          <Control.text type="password" placeholder="Password" model=".password" validators={{required,length}} />
          <Errors className="errors" model="user_form.password"show="touched"messages={{required: 'Password is required. ',length:"Should be atleast 6 characters long."}}/>
          <Control.reset className="btn grey left" model="user" type="reset">Reset</Control.reset>
           <button className="light-blue btn right">Submit</button>
          </Form>
        </div>
        </div>
      </div>
    );
  }
}

 