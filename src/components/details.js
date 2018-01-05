import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {bindActionCreators} from "redux";
import CustomModal from "../extras/modal";

import NavigationBar from "./nav";
import {request,Delete_Shopping_List_Item,Edit_Shopping_List_Item,Add_Shopping_List_Item,Fetch_Shopping_List_Items} from "../actions";
import PropTypes from "prop-types";


class Details extends Component {
    constructor(props) {
        super(props);
        this.state={edit_item:{quantity:"",old_name:"",new_name:"",id:"",parent_id:""}};
        this.handleAddListItem = this.handleAddListItem.bind(this);
        this.handleEditValues = this.handleEditValues.bind(this);
        this.handleEditListItem = this.handleEditListItem.bind(this);
        this.handleDeleteListItem = this.handleDeleteListItem.bind(this);


    }

    componentDidMount() {
        CustomModal();
        this.props.actions.request();
        this.props.actions.Fetch_Shopping_List_Items(this.props.match.params.id);
    }

    handleAddListItem(e){
        e.preventDefault();
        this.props.actions.request();
        this.props.actions.Add_Shopping_List_Item({
            "list_id":this.props.match.params.id,
            "item_name":this.refs.add_item_name.value,
            "quantity":this.refs.add_quantity.value
        });
    }
    handleEditValues(e){
        e.preventDefault();
        let edit_item = this.state.edit_item;
        if(e.target.name === "new_name"){
        edit_item.new_name = e.target.value;
        }
        else if(e.target.name === "quantity"){
            edit_item.quantity = e.target.value;
        }
        this.setState(edit_item);
    }

    handleEditListItem(e){
        e.preventDefault();
        this.props.actions.request();
        this.props.actions.Edit_Shopping_List_Item({
            "list_id":this.refs.list_id.value,
            "item_id":this.refs.item_id.value,
            "item_name":this.refs.new_name.value,
            "quantity":this.refs.quantity.value});
    }

    handleDeleteListItem(e,id){
        e.preventDefault();
        this.props.actions.request();
        this.props.actions.Delete_Shopping_List_Item({
            "list_id":this.props.items_details.parent.list_id,
            "item_id":id
        });
    }

    renderListTableDetails() {
        if (!this.props.items_details.items || undefined in this.props.items_details.items ){
            return (
                <div>
                    <h6 className="secondary-text-color">Please Create a Shopping List by Pressing the Floating "+"
                        button.</h6>
                </div>
            );
        }
        else {
                return (
                    <table className="container highlight" style={{width: "100%"}}>
                        <thead>
                        <tr>
                            <th>
                            <h6>Details for "{this.props.items_details.parent.list_name}" shopping list.</h6>
                            </th>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {_.map(_.mapKeys(this.props.items_details.items, "item_name"),
                            item => {
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            {item.item_name}
                                        </td>
                                        <td>
                                            {item.quantity}
                                        </td>
                                        <td>
                                            <a className="modal-trigger waves-effect waves-light"
                                               href="#edit-item-modal"
                                               onClick={() => {
                                                   this.setState({
                                                       "edit_item":
                                                           {
                                                               "old_name": item.item_name,
                                                               "id": item.id,
                                                               "parent_id":this.props.items_details.parent.list_id,
                                                               "quantity":parseInt(item.quantity)
                                                           }
                                                   });
                                               }}>
                                                <i className="default-text-color material-icons right">edit</i>
                                            </a>
                                        </td>
                                        <td>
                                            <a className="waves-effect waves-light"
                                               onClick={e => this.handleDeleteListItem(e, item.id)}>
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
                    <a className="modal-trigger right btn-floating btn-large waves-effect waves-light accent-color"
                       href="#add-item-modal">
                        <i className="material-icons">add</i>
                    </a>
                    <div id="add-item-modal" className="modal">
                        <a className="modal-action modal-close waves-effect waves-green btn-flat right ">
                            <i className="material-icons red">close</i>
                        </a>
                        <div className="modal-content">
                            <h6>Add A New Item.</h6>
                            <form onSubmit={this.handleAddListItem}>
                                <div>
                                    <input ref="add_item_name"
                                           type="text"
                                           placeholder="Item Name"
                                           pattern="^(\w+ ?)*$"
                                           title="Must not contain special characters."
                                           required/>
                                    <input ref="add_quantity"
                                           type="number"
                                           placeholder="Quantity"
                                           defaultValue="1"
                                           // pattern="^(\d)*$"
                                           title="Please enter a number between 1 and 10000"
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
                    <div id="edit-item-modal" className="modal">
                        <a className="modal-action modal-close waves-effect waves-green btn-flat right ">
                            <i className="material-icons red">close</i>
                        </a>
                        <div className="modal-content">
                            <h6>Edit "{this.state.edit_item.old_name}" item.</h6>
                            <form onSubmit={this.handleEditListItem}>
                                <div>
                                    <input ref="item_id"
                                           value={this.state.edit_item.id}
                                           type="text"
                                           required
                                           hidden
                                    />
                                    <input ref="list_id"
                                           value={this.state.edit_item.parent_id}
                                           type="text"
                                           required
                                           hidden
                                    />
                                    <input ref="new_name"
                                           name="new_name"
                                           value={this.state.edit_item.new_name || this.state.edit_item.old_name}
                                           onChange={this.handleEditValues}
                                           type="text"
                                           placeholder="New List Name"
                                           pattern="^(\w+ ?)*$"
                                           title="Must not contain special characters edit"
                                           required
                                    />
                                    <input ref="quantity"
                                           onChange={this.handleEditValues}
                                           name="quantity"
                                           type="number"
                                           min={1}
                                           value={this.state.edit_item.quantity}
                                           required/>

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
Details.propTypes = {
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.object,
    items_details: PropTypes.object,
    loading : PropTypes.bool,
};
function mapStateToProps(state) {
    return {
        items_details: state.items_details,
        loading : state.loading
    };
}
function mapDispatchToProps(dispatch) {
    return {actions : bindActionCreators(
            {
                Fetch_Shopping_List_Items, Add_Shopping_List_Item,Edit_Shopping_List_Item,Delete_Shopping_List_Item,
                request
            },dispatch)};
}
export default connect(mapStateToProps,mapDispatchToProps)(Details);