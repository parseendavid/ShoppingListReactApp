import React, { Component } from 'react';
import {Field, reduxForm} from "redux-form"
import NavBar from "./navigation_bars/non_logged_in_user_dash"

class LoginPage extends Component {
renderField = ({input,placeholder,type,meta: { touched, error, warning }}) =>(
    <div>
      <div>
        <input {...input} type={type} className="form-control" placeholder={placeholder}/>
        {touched &&((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
      <br/>
    </div>
  )
  render() {
    return (
      <div>
        <NavBar/>
        <div className="jumbotron" id='white-bg'>
          <form className="form-signin">
            <h3 className="form-signin-heading">Login</h3>
            <Field
              name="Email"
              type="email"
              placeholder="Email Address"
              component={this.renderField}
              />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              component={this.renderField}
              />
          </form>
        </div>
      </div>
    );
  }
}
export default reduxForm(
  {
    form: "LoginForm"
  }
)(LoginPage)