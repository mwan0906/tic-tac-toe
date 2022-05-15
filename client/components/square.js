import React from 'react';

class Square extends React.Component {

  render() {
    const content = this.props.content;
    const onClick = (content == '') ? (e) => this.props.move(e) : null;
    return (
      <th
        className={`square ${this.props.isAdjacent ? 'highlighted' : ''}`}
        onMouseEnter={(e) => this.props.hover(e)}
        onMouseLeave={(e) => this.props.unhover(e)}
        onClick={onClick}
        id={this.props.id}
      >
      {content}
      </th>
    );
  }
}

export default Square;