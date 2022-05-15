import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='header'>
        <button id='logout' onClick={this.props.logout}>Logout</button>
        <div id='turnCounter'>
          Turn {this.props.turnCount}/5
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    turnCount: state.turnCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);