import React, { Component } from 'react';


export default function ({text, icon,link}){
    return (
        <nav className="light-blue lighten-1">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo"><i className="material-icons right">home</i></a>
          <ul className="right hide-on-med-and-down">
          <a className="waves-effect waves-light btn-flat text-primary-color " href={link}><i className="material-icons right">{icon}</i>{text}</a>
          </ul>
        </div>
        </nav>
    );
}