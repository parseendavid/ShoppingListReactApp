import React from 'react';
import PropTypes from "prop-types";
import {ToastContainer} from "react-toastify";

function Nav({text, icon, link, home_link}) {
    return (
        <nav className="light-blue lighten-1">
            <div className="nav-wrapper">
                <a href={home_link || "/"} className="brand-logo"><i className="material-icons right">home</i></a>
                <ul className="right hide-on-med-and-down">
                    <a className="waves-effect waves-light btn-flat text-primary-color " href={link}><i
                        className="material-icons right">{icon}</i>{text}</a>
                </ul>
            </div>
            <ToastContainer hideProgressBar={true}/>
        </nav>
    );
}
Nav.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    link: PropTypes.string,
    home_link: PropTypes.string
};
export default Nav;