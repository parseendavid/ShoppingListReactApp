import React, {Component} from 'react';
import Navbar from './nav';


export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className={"badge"} style={{backgroundColor:"grey"}}>
                    <h1>Page Not Found</h1>
                    <p>Sorry, but the page you were trying to view does not exist.</p>
                </div>
            </div>
        );
    }
}