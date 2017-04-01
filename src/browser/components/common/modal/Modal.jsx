import React from 'react';
import './Modal.css';

class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.close(event);
  }

  render() {
    return (
      <div className="modal">
        <a
          href={null}
          className="modal_handle"
          onClick={this.handleClick}
        >chiudi</a>
      </div>
    );
  }

}

Modal.propTypes = {
  close: React.PropTypes.func,
};

Modal.defaultProps = {
  close: null,
};

export default Modal;
