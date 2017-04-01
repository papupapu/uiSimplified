import React from 'react';
import TextInput from '../input/Text';
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

  modalBody() {
    const { type } = this.props;
    switch (type) {
      case 'login':
        return (
          <div className="format">
            <h1>Login</h1>
            <div className="content">
              <p>loginmodal body</p>
              <TextInput class="email" placeholder="Email" name="email" required />
              <TextInput class="pwd" placeholder="Password" name="pwd" required />
            </div>
          </div>
        );
      default:
        return (
          <div className="format">
            <h1>Genric Message</h1>
            <div className="content">
              <p>Not much to say here...</p>
            </div>
          </div>
        );
    }
  }

  render() {
    const close = <a href={null} className="modal_handle" onClick={this.handleClick}>Chiudi</a>;
    const body = this.modalBody();
    return (
      <div ref={(modal) => { this.modal = modal; }} className="modal">
        {close}
        {body}
      </div>
    );
  }

}

Modal.propTypes = {
  type: React.PropTypes.string,
  data: React.PropTypes.instanceOf(Object),
  close: React.PropTypes.func,
};

Modal.defaultProps = {
  type: '',
  data: {},
  close: null,
};

export default Modal;
