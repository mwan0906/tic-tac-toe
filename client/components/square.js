import React from 'react';
import { connect } from 'react-redux';
import { getAi, getPlayer } from '../store';

class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: ''
    }
  }

  async move(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    this.props.getPlayer(this.props.coords)
    await this.props.getAi().then(res =>
      this.setState({
        loading: false,
        error: res
      })
    );

  }

  render() {
    const content = this.props.content;
    if (content == '') return (
      <th className="square" onClick={(e) => this.move(e)}></th>
    );
    return (
      <th className="square">{content}</th>
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
    getAi: () => dispatch(getAi()),
    getPlayer: (coords) => dispatch(getPlayer(coords))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Square);