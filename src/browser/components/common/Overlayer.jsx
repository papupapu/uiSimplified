import React from 'react';

class Overlayer extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.handleClick();
  }

  render() {
    const css = `${this.props.action}-overlayer overlayer`;
    return (
      <div className={css} onClick={this.handleClick} onTouchStart={this.handleClick} />
    );
  }

}

Overlayer.propTypes = {
  action: React.PropTypes.string,
  handleClick: React.PropTypes.func,
};

Overlayer.defaultProps = {
  action: '',
  handleClick: null,
};

export default Overlayer;
