import React from 'react';
import PropTypes from "prop-types";
import {ToastContainer} from "react-toastify";
import { Loader } from 'react-overlay-loader';


function Nav({text, icon, link, home_link, loading=false}) {
    return (
        <nav className="light-blue lighten-1">
            <Loader fullPage loading={loading} />
            <div className="nav-wrapper">
                <a href={home_link || "/"} className="brand-logo"><i className="material-icons right">home</i></a>
                <ul className="right hide-on-med-and-down">
                    <a className="waves-effect waves-light btn-flat text-primary-color " href={link}><i
                        className="material-icons right">{icon}</i>{text}</a>
                </ul>
            </div>
            <ToastContainer hideProgressBar/>
        </nav>
    );
}
Nav.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    link: PropTypes.string,
    home_link: PropTypes.string,
    loading : PropTypes.bool
};
export default Nav;