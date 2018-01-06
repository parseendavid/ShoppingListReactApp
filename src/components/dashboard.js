import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import CustomModal from "../extras/modal";

import NavigationBar from "./nav";
import {request,Delete_Shopping_List,Edit_Shopping_List,Add_Shopping_List,Fetch_Shopping_Lists} from "../actions";
import PropTypes from "prop-types";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state={list_name:"", edit_list:{name:"",id:""}};
        this.handleAddList = this.handleAddList.bind(this);
        this.handleEditValues = this.handleEditValues.bind(this);
        this.handleEditList = this.handleEditList.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);


    }

    componentDidMount() {
        CustomModal();
        this.props.actions.request();
        this.props.actions.Fetch_Shopping_Lists();
    }

    handleAddList(e){
        e.preventDefault();
        this.props.actions.request();
        this.props.actions.Add_Shopping_List({"list_name":this.refs.list_name.value});
    }
    handleEditValues(e){
        e.preventDefault();
        let edit_list = this.state.edit_list;
        edit_list["new_name"] = e.target.value;
        this.setState(edit_list);
    }

    handleEditList(e){
        e.preventDefault();
        this.props.actions.request();
        this.props.actions.Edit_Shopping_List({"id":this.refs.list_id.value,"list_name":this.refs.new_name.value});
    }

    handleDeleteList(e,id){
        e.preventDefault();
        this.props.actions.request();
        this.props.actions.Delete_Shopping_List(id);
    }

    // handleViewListDetails(e, list_details){
    //     e.preventDefault();
    //     console.log(list_details);
    //
    // }

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
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Items</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {_.map(_.mapKeys(this.props.lists, "list_name"),
                        list => {
                            return (
                                <tr key={list.id}>
                                    <td>
                                        {list.list_name}
                                    </td>
                                    <td>
                                        <Link className="waves-effect waves-light"
                                           to={`/list/${list.id}`}>
                                            details </Link>
                                    </td>
                                    <td>
                                        <a className="modal-trigger waves-effect waves-light" href="#edit-list-modal"
                                        onClick={()=>{this.setState({"edit_list":
                                            {
                                            "name":list.list_name,"id":list.id
                                            }
                                        });
                                        }}>
                                            <i className="default-text-color material-icons right">edit</i>
                                        </a>
                                    </td>
                                    <td>
                                        <a className="waves-effect waves-light"
                                        onClick={e=>this.handleDeleteList(e,list.id)}>
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
                    <NavigationBar text="logout" icon="input" link="/logout" home_link="/dashboard"
                                   loading={this.props.loading}/>
                    <div className="container badge">
                        <h6>Dashboard</h6>
                        <a className="modal-trigger right btn-floating btn-large waves-effect waves-light accent-color"
                           href="#add-list-modal">
                            <i className="material-icons">add</i>
                        </a>
                        <div id="add-list-modal" className="modal">
                            <a className="modal-action modal-close waves-effect waves-green btn-flat right ">
                                <i className="material-icons red">close</i>
                            </a>
                            <div className="modal-content">
                                <h6>Add A New Shopping List</h6>
                                <form onSubmit={this.handleAddList}>
                                    <div>
                                        <input ref="list_name"
                                               type="text"
                                               placeholder="List Name"
                                               pattern="^(\w+ ?)*$"
                                               title="Must not contain special characters."
                                               required/>
                                        <div className="modal-footer">
                                            <button className={"btn waves-effect waves-light light-blue right"}
                                                    type="submit">
                                                ADD
                                            </button>
                                            <button className={"btn waves-effect waves-light grey left"}
                                                    type="reset">
                                                RESET
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div id="edit-list-modal" className="modal">
                            <a className="modal-action modal-close waves-effect waves-green btn-flat right ">
                                <i className="material-icons red">close</i>
                            </a>
                            <div className="modal-content">
                                <h6>Edit list "{this.state.edit_list.name}"</h6>
                                <form onSubmit={this.handleEditList}>
                                    <div>
                                        <input ref="list_id"
                                               value={this.state.edit_list.id}
                                               type="text"
                                               required
                                               hidden
                                        />
                                        <input ref="new_name"
                                               value={this.state.edit_list.new_name || this.state.edit_list.name}
                                               onChange={this.handleEditValues}
                                               type="text"
                                               placeholder="New List Name"
                                               pattern="^(\w+ ?)*$"
                                               title="Must not contain special characters edit"
                                               required
                                        />
                                        <div className="modal-footer">
                                            <button className={"btn waves-effect waves-light light-blue right"}
                                                    type="submit">
                                                CHANGE
                                            </button>
                                            <button className={"btn waves-effect waves-light grey left"}
                                                    type="reset">
                                                RESET
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {this.renderListTableDetails()}
                    </div>
                </div>
            );
    }
}
Dashboard.propTypes = {
    token: PropTypes.string,
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.object,
    lists: PropTypes.object,
    loading:PropTypes.bool
};
function mapStateToProps(state) {
    return {
        loading:state.loading,
        lists: state.lists}
        ;
}
function mapDispatchToProps(dispatch) {
    return {actions : bindActionCreators(
        {
            Fetch_Shopping_Lists, Add_Shopping_List,Edit_Shopping_List,Delete_Shopping_List,request
        },dispatch)};
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);