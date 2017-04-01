import React from 'react';

class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.handleClick();
  }

  render() {
    return (
      <div className="modal" onClick={this.handleClick}>modale</div>
    );
  }

}

Modal.propTypes = {
  handleClick: React.PropTypes.func,
};

Modal.defaultProps = {
  handleClick: null,
};

export default Modal;
