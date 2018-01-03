import React, {Component} from 'react';
import Navbar from './nav';


export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Navbar text="login" icon="input" link="/login"/>
                <div className="container badge" id="animate-area">
                    <h1>Welcome</h1>
                    <p className="lead">The Ultimate Shopping List App</p>
                    <br/>
                    <br/>
                    <a className="home-btn waves-effect waves-ligh accent-color btn-large " href="/signup"><i
                        className="material-icons right">label_outline</i>sign up</a>

                </div>
            </div>
        );
    }
}