import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { getAi } from '../store';

class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: ''
    }
  }

  async select(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    this.props.move(this.props.coords).then(res =>
      this.setState({
        loading: false,
        error: res
      })
    );
  }

  render() {
    const content = this.props.content;
    if (content == '') return (
      <span className="square blank" onClick={this.props.getAi}>██</span>
    );
    return (
      <span className="square">{content}</span>
    );
  }
}

const mapStateToProps = state => {
  return {
    board: state.board
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAi: () => dispatch(getAi())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Square);