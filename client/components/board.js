// Controls the matrix and renders the grid, which is made of several Squares.

import React from 'react';
import Square from './square';
import { connect } from 'react-redux';
import throbber from '../throbber.gif'
import { getAi, getPlayer } from '../store';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      row: 'X',
      column: 'X'
    }

    this.props.getPlayer = this.props.getPlayer.bind(this)
  };

  async move(e, i, j) {
    e.preventDefault();
    if (!this.props.loading) {

      this.props.getPlayer([i, j])

      await this.props.getAi().then(res =>
        this.setState({
          error: res
        })
      );

    }

  }

  hover(e) {
    e.target.style.background = 'lightcoral';
    this.setState({
      row: e.target.id[0],
      column: e.target.id[1]
    });
  }

  unhover(e) {
    e.target.style.background = '';
    this.setState({
      row: 'X',
      column: 'X'
    });
  }

  render() {
    const board = this.props.board;
    let grid = [];
    for (let i = 0; i < 3; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(
          <Square
            move={(e) => (this.move(e, i, j))}
            hover={(e) => (this.hover(e))}
            unhover={(e) => (this.unhover(e))}
            id={`${i}${j}`}
            content={board[i][j]}
            isAdjacent={(i == this.state.row || j == this.state.column)}
          />
        )
      }
      grid.push(row);
    }
    return (
      <React.Fragment>
        {this.props.loading && <img src={throbber} id='loading' />}
        <table id='board'>
          <tr>
            {grid[0]}
          </tr>
          <tr>
            {grid[1]}
          </tr>
          <tr>
            {grid[2]}
          </tr>
        </table>
      </React.Fragment>
    );
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Board);