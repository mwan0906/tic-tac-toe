import React from 'react';
import Board from './board';
import Login from './login';
import { connect } from 'react-redux';
import { login } from '../store';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(window.sessionStorage.getItem('token'))
    if (!!window.sessionStorage.getItem('token')) {
      this.props.login()
    }
  }

  render() {
    return (this.props.loggedIn) ? (
      <Board />
    ) : (
      <Login />
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);