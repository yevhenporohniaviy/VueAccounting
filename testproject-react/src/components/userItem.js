import React, { Component } from 'react';
import {connect} from 'react-redux';
import {deleteUser} from "../store/actions";

class UserItem extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.user.fio}</h2>
        <p>{this.props.user.first_name}</p>
        <button>Edit</button>
        <button
          onClick={()=>this.props.dispatch(deleteUser(this.props.user.id))}>
          Delete</button> 
      </div>
    );
  }
}
export default connect()(UserItem);
