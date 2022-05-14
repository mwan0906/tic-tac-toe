import React from 'react';
import { connect } from 'react-redux';
import { getAi, getPlayer } from '../store';

class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    }
  }

  async move(e) {
    e.preventDefault();
    if (!this.props.loading) {

      this.props.getPlayer(this.props.coords)

      await this.props.getAi().then(res =>
        this.setState({
          error: res
        })
      );

    }

  }

  hover(e) {
    e.target.style.background = 'lightgray';
  }

  unhover(e) {
    e.target.style.background = '';
  }

  render() {
    const content = this.props.content;
    const onClick = (content == '') ? (e) => this.move(e) : null;
    return (
      <th className="square"
        onMouseEnter={(e) => this.hover(e)}
        onMouseLeave={(e) => this.unhover(e)}
        onClick={onClick}
      >{content}
      </th>
    );
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAi: () => dispatch(getAi()),
    getPlayer: (coords) => dispatch(getPlayer(coords))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Square);