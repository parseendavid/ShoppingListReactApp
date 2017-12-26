import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

export default class Logout extends Component {
  componentWillMount(){
    localStorage.removeItem('TOKEN');
    this.forceUpdate
  }
  render() {
    return (
      <Redirect to="/"/>
    );
  }
}