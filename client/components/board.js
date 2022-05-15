// Controls the matrix and renders the grid, which is made of several Squares.

import React from 'react';
import Square from './square';
import { connect } from 'react-redux';
import { getAi, getPlayer, win } from '../store';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      row: 'X',
      column: 'X'
    }

    this.props.getPlayer = this.props.getPlayer.bind(this)
  };

  async move(e, i, j) {
    e.preventDefault();
    if (!this.props.loading && !this.props.victor) {
      let playerWin = this.checkWin(this.props.getPlayer([i, j]), [i, j])
      if (playerWin) this.props.win('PLAYER')
      else {
        let aiWin = await this.props.getAi().then(res => this.checkWin(res));
        if (aiWin) this.props.win('AI')
      }
      if (this.props.turnCount == 5) this.props.win('X')
    }
  }

  checkWin(board, coords) {
    let win = false;
    if (!coords) {
      if (board[0][0] == 'O') {
        if (board[0][1] == 'O' && board[0][2] == 'O') win = true;
        if (board[1][0] == 'O' && board[2][0] == 'O') win = true;
        if (board[1][1] == 'O' && board[2][2] == 'O') win = true;
      }
      if (board[1][1] == 'O') {
        if (board[1][0] == 'O' && board[1][2] == 'O') win = true;
        if (board[0][1] == 'O' && board[2][1] == 'O') win = true;
        if (board[0][2] == 'O' && board[2][0] == 'O') win = true;
      }
      if (board[2][2] == 'O') {
        if (board[2][0] == 'O' && board[2][1] == 'O') win = true;
        if (board[0][2] == 'O' && board[1][2] == 'O') win = true;
      }
    }
    else {
      const [i, j] = coords;
      if (
        (board[i][0] == 'X' && board[i][1] == 'X' && board[i][2] == 'X') ||
        (board[0][j] == 'X' && board[1][j] == 'X' && board[2][j] == 'X')
      ) { win = true; }
      if (
        (i + j) % 2 == 0 && // Checks if the coordinates indicate a corner square or center square
        ((board[0][0] == 'X' && board[1][1] == 'X' && board[2][2] == 'X') ||
        (board[0][2] == 'X' && board[1][1] == 'X' && board[2][0] == 'X'))
      ) { win = true; }
    }
    return win;
  }

  hover(e) {
    if (!this.props.victor) {
      e.target.style.background = 'lightcoral';
      this.setState({
        row: e.target.id[0],
        column: e.target.id[1]
      });
    }
  }

  unhover(e) {
    if (!this.props.victor) {
      e.target.style.background = '';
      this.setState({
        row: 'X',
        column: 'X'
      });
    }
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
    );
  };
};

const mapStateToProps = state => {
  return {
    board: state.board,
    loading: state.loading,
    victor: state.victor,
    turnCount: state.turnCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAi: () => dispatch(getAi()),
    getPlayer: (coords) => dispatch(getPlayer(coords)),
    win: (victor) => dispatch(win(victor))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);