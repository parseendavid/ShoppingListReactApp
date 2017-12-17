import _ from "lodash"
import React, { Component } from 'react';
import NavBar from "./navigation_bars/dashboard_page_navs"
import {connect} from "react-redux"
import {Fetch_Shopping_List_Items} from "../actions"

class DetailsPage extends Component {
  componentDidMount(){
    this.props.Fetch_Shopping_List_Items()
  }
  renderItemsTableDetails(){
    return(
      _.map(_.mapKeys(this.props.items, "item_name"),
    item => {
      return(
        <tr key={item.id}>
          <td>
            {item.item_name}
          </td>
          <td>
            {item.id}
          </td>
        </tr>
      )
    })
    )
  }
  render() {
    return (
      <div>
        <NavBar/>
        <div className="jumbotron">
          <h3>Details</h3>
          <table className="table table-bordered table-striped" style={{width:"100%"}}>
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>id</th>
              </tr>
            </thead>
            <tbody>
              {this.renderItemsTableDetails()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {items : state.items}
}
export default connect(mapStateToProps, {Fetch_Shopping_List_Items})(DetailsPage)