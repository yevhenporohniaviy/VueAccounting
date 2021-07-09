import React, {Component} from "react";
import { connect } from 'react-redux';
import UserItem from './userItem'
import { fetchUsers } from "../store/actions";

const mapStateToProps = (state) => ({
  users: state.todoReducer.users
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: () => {
      dispatch(fetchUsers());
    }
  };
};

class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.onFetchUsers()
  }

  handleDelete(id) {
    console.log(id)
  }

  render() {
    const users = this.props.users;

    return (
      <div>
        {users.map((user) => <UserItem key={user.id} user={user} />)}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListUsers)
