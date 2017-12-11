import _ from "lodash"
import React, { Component } from 'react';
import NavBar from "./navigation_bars/dashboard_page_navs"
import {connect} from "react-redux"
import {Fetch_Shopping_Lists} from "../actions"

class DashboardPage extends Component {
  componentDidMount(){
    this.props.Fetch_Shopping_Lists()
  }
  renderListTableDetails(){
    return(
      _.map(_.mapKeys(this.props.lists, "list_name"),
    list => {
      return(
        <tr key={list.id}>
          <td>
            {list.list_name}
          </td>
          <td>
            {list.id}
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
        <div className="jumbotron" style={{backgroundColor:"white"}}>
          <h3>Dashboard</h3>
          <table className="table table-striped" style={{width:"100%"}}>
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>id</th>
              </tr>
            </thead>
            <tbody>
              {this.renderListTableDetails()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {lists : state.lists}
}
export default connect(mapStateToProps, {Fetch_Shopping_Lists})(DashboardPage)