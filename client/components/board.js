// Controls the matrix and renders the grid, which is made of several Squares.

import React from 'react';
import Square from './square';
import { connect } from 'react-redux';
import throbber from '../throbber.gif'

class Board extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const board = this.props.board;
    let grid = [];
    for (let i = 0; i < 3; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(<Square coords={[i,j]} content={board[i][j]} />)
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

export default connect(mapStateToProps)(Board);