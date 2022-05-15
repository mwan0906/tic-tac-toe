import React from 'react';
import { connect } from 'react-redux';
import { reset } from '../store';

const mapVictorToMessage = {
  'X': 'Draw',
  'PLAYER': 'You win',
  'AI': 'AI win'
}

class Postgame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.victor) return;
    return (
      <div id='postgame'>
        <div id='victory'>{mapVictorToMessage[this.props.victor]}</div>
        <br />
        <button onClick={this.props.reset}>Reset?</button>
      </div>
    )
  }
};  

const mapStateToProps = state => {
  return {
    victor: state.victor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reset: () => dispatch(reset())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Postgame);