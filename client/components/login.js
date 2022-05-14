import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../store';
import throbber from '../throbber.gif'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  };

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });

    axios.post(
      'https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/auth',
      { email: e.target.email.value }
    )
    
    .then(({data}) => {
      this.setState({
        loading: false,
        error: ''
      })
      window.sessionStorage.setItem('token', data.token)
      this.props.login();
    })
    
    .catch(({response}) => {
      this.setState({
        loading: false,
        error: response.data.error
      });
    });
  }

  render() {
    return (<div>
      {this.state.loading && <img src={throbber} id='loading' />}
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
            <button type='submit' disabled={this.state.loading}>
              Sign Up
            </button>
          </div>
        </form>
    </div>)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login())
  };
}

export default connect(null, mapDispatchToProps)(Login);