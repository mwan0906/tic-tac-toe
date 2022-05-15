import React from 'react';
import Gamepage from './gamepage';
import Login from './login';
import { connect } from 'react-redux';
import { login } from '../store';
import throbber from '../throbber.gif'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!!window.sessionStorage.getItem('token')) {
      this.props.login()
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.loading && <img src={throbber} id='loading' />}
        {this.props.loggedIn ? <Gamepage /> : <Login />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);