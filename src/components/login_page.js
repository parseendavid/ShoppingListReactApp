import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";

import Navbar from "./nav";
import {Login_User,request} from "../actions";

export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state={course:""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = {"email":this.refs.email.value, "password":this.refs.password.value };
        this.props.actions.request();
        this.props.actions.Login_User(formData);
    }



    render() {
        if (this.props.state.token) {
            return (
                <Redirect push to="/dashboard"/>
            );
        }
        else {
            return (
                <div>
                    <Navbar text="sign up" icon="label_outline" link="/signup" loading={this.props.state.loading}/>
                    <div className="badge">
                        <div className="small_form container">
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                <input ref="email"
                                       type="email"
                                       placeholder="Email"
                                       required/>
                                <input ref="password"
                                       type="password"
                                       placeholder="password"
                                       minLength="6"
                                       required/>
                                <button className={"btn waves-effect waves-light light-blue right"}
                                        type="submit">
                                    LOGIN
                                </button>
                                <button className={"btn waves-effect waves-light grey left"}
                                        type="reset">
                                    RESET
                                </button>
                                </div>
                            </form>
                        </div>
                        <p>If you do not have an account, please <a href={"/signup"}>Sign Up.</a></p>
                    </div>
                </div>
            );
        }
    }
}

LoginPage.propTypes = {
    token: PropTypes.string,
    dispatch: PropTypes.object,
    state: PropTypes.object,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({Login_User,request}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);