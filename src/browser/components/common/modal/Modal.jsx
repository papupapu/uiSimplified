import React from 'react';
import TextInput from '../input/Text';
import { CLOSE } from '../../../../common/graphic/SVGCodes';
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
    const { type, data } = this.props;
    let title;
    let subtitle;
    switch (type) {
      case 'login':
        return (
          <div className="format">
            <h1>my<span>Logo</span> - <em>get in ;)</em></h1>
            <div className="content">
              <p>loginmodal body</p>
              <TextInput class="email" placeholder="Email" name="email" required />
              <TextInput class="pwd" placeholder="Password" name="pwd" required />
            </div>
          </div>
        );
      default:
        title = data && data.title ? <h2>{data.title}</h2> : <h2>Ops... no data here...</h2>;
        subtitle = data && data.subtitle ? <p>{data.subtitle}</p> : null;
        return (
          <div className="format">
            <h1>Just a generic message...</h1>
            <div className="content">
              {title}
              {subtitle}
            </div>
          </div>
        );
    }
  }

  render() {
    const close = (
      <a href={null} className="modal_handle" onClick={this.handleClick}>
        <svg viewBox="0 0 15 15">
          <path
            d={CLOSE.d}
            fillRule="evenodd"
            transform={CLOSE.transform}
          />
        </svg>
      </a>
    );
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
