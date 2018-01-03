import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import NavigationBar from "./nav";
import {Fetch_Shopping_Lists} from "../actions";
import PropTypes from "prop-types";


class Dashboard extends Component {
    componentWillMount() {
        this.props.Fetch_Shopping_Lists();
    }

    renderListTableDetails() {
        if (undefined in this.props.lists) {
            return (
                <h6 className="secondary-text-color">Please Create a Shopping List by Pressing the Floating "+"
                    button.</h6>
            );
        }
        else {
            return (
                <table className="container highlight" style={{width: "100%"}}>
                    <tbody>
                    {_.map(_.mapKeys(this.props.lists, "list_name"),
                        list => {
                            return (
                                <tr key={list.id}>
                                    <td>
                                        {list.list_name}
                                    </td>
                                    <td>
                                        <a className="waves-effect waves-light" href={`/list/${list.id}`}>details</a>
                                    </td>
                                    <td>
                                        <a className="waves-effect waves-light" href="#">
                                            <i className="default-text-color material-icons right">edit</i>
                                        </a>
                                    </td>
                                    <td>
                                        <a className="waves-effect waves-light" href="#">
                                            <i className="delete-text-color material-icons right">delete_sweep</i>
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        }
    }

    render() {
        return (
            <div>
                <NavigationBar text="logout" icon="input" link="/logout"/>
                <div className="container badge">
                    <h6>Dashboard</h6>
                    {this.renderListTableDetails()}
                    <a className="right btn-floating btn-large waves-effect waves-light accent-color"><i
                        className="material-icons">add</i></a>
                </div>
            </div>
        );
    }
}
Dashboard.propTypes = {
    token: PropTypes.string,
    Fetch_Shopping_Lists: PropTypes.func.isRequired,
    dispatch: PropTypes.object,
    lists: PropTypes.object
};
function mapStateToProps(state) {
    return {lists: state.lists};
}

export default connect(mapStateToProps, {Fetch_Shopping_Lists})(Dashboard);