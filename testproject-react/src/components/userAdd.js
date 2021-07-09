import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addUser } from '../store/actions/index';


const mapDispatchToProps = dispatch => {
  return {
    onAddUser: user => {
      dispatch(addUser(user));
    }
  };
};

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fio: '',
      first_name: '',
      last_name: '',
      email: '',
      published: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    this.props.onAddUser(this.state)
    this.setState({
      fio: '',
      first_name: '',
      last_name: '',
      email: '',
      published: false
    })
    event.preventDefault();
  }

  handleChange(event) {
    const field = event.target.name
    this.setState({ [field]: event.target.value});
  }

  render() {
    return (
      <>
        <form className="form form-horizontal" onSubmit={this.handleSubmit} ref={(el) => this.myFormRef = el}>
          <div className="row">
            <h3 className="centerAlign">Add Your Todo</h3>
            <div className="col-md-12">
              <FormControl>
                <InputLabel htmlFor="fio">Fio</InputLabel>
                <Input id="fio" name={'fio'} onChange={this.handleChange}/>
              </FormControl>
            </div>
            <div className="col-md-12">
              <FormControl>
                <InputLabel htmlFor="first_name">First name</InputLabel>
                <Input id="first_name" name={'first_name'} onChange={this.handleChange}/>
              </FormControl>
            </div>
            <div className="col-md-12">
              <FormControl>
                <InputLabel htmlFor="last_name">Last name</InputLabel>
                <Input id="last_name" name={'last_name'} onChange={this.handleChange}/>
              </FormControl>
            </div>
            <div className="col-md-12">
              <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name={'email'} onChange={this.handleChange}/>
              </FormControl>
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </>
    );
  }
}
export default connect(
  null,
  mapDispatchToProps
)(AddUser);

