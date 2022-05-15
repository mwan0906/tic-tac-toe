import React from 'react';
import Board from './board';
import Header from './header';
import Postgame from './postgame';

class Gamepage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Board />
        <Postgame />
      </React.Fragment>
    )
  }
}

export default Gamepage;