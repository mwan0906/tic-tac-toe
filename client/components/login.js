import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { login, load, unload } from '../store';
import throbber from '../throbber.gif'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  };

  async handleSubmit(e) {
    e.preventDefault();
    this.props.load();

    axios.post(
      'https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/auth',
      { email: e.target.email.value }
    )
    
    .then(({data}) => {
      this.setState({
        error: ''
      })
      window.sessionStorage.setItem('token', data.token)
      this.props.login();
      this.props.unload();
    })
    
    .catch(({response}) => {
      this.setState({
        error: response.data.error
      });
      this.props.unload();
    });
  }

  render() {
    return (<div>
      {this.props.loading && <img src={throbber} id='loading' />}
      <form id='login' onSubmit={this.handleSubmit}>
          <div className='inputs'>
            <div id='error'>{this.state.error}</div>
            <label for='email'>Email Address</label>
            <br />
            <input
              id='email'
              type='text'
              placeholder='me@test.com'
              required
            />
            <br />
            <button type='submit' disabled={this.props.loading}>
              Sign Up
            </button>
          </div>
        </form>
    </div>)
  }
};

const mapStateToProps = state => {
  return {
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login()),
    load: () => dispatch(load()),
    unload: () => dispatch(unload())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);