import React from 'react';

class Square extends React.Component {

  hover(e) {
    e.target.style.background = 'lightgray';
  }

  unhover(e) {
    e.target.style.background = '';
  }

  render() {
    const content = this.props.content;
    const onClick = (content == '') ? (e) => this.props.move(e) : null;
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

export default Square;