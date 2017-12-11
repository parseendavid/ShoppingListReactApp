import React, { Component } from 'react';
import NavBar from "./navigation_bars/non_logged_in_user_dash"

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="jumbotron">
          <div className="container">
              <h1 className="display-4">Welcome</h1>
              <p className="lead">The Ultimate Shopping List App</p>
          </div>
        </div>
        <div className="text-center">
          <a className="btn btn-lg btn-success" href="/login">LOGIN</a>
          <a className="btn btn-lg btn-warning" href="/signup">SIGN UP</a>
          <br/><br/><br/><br/>
        </div>
      </div>
    );
  }
}