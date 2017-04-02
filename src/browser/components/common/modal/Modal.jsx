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
      case 'sendMail':
        title = data && data.title ? <h2>{data.title}</h2> : <h2>Ops... no data here...</h2>;
        subtitle = data && data.subtitle ? <p>{data.subtitle}</p> : null;
        return (
          <div className="format">
            <h1>Send this article via mail</h1>
            <div className="content">
              {title}
              {subtitle}
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
              <h2>The handle you clicked had no action assigned</h2>
              <p>Not much I can do without actions... maybe I can sing you a song...</p>
              <p className="song">
                <em>
                  Desmond has a barrow in the marketplace
                  Molly is the singer in a band
                  Desmond says to Molly girl I like your face
                  And Molly says this as she takes him by the hand
                </em>
              </p>
              <p className="song">
                <em>
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                </em>
              </p>
              <p className="song">
                <em>
                  Desmond takes a trolley to the jeweler&#39;s store
                  Buys a twenty carat golden ring
                  Takes it back to Molly waiting at the door
                  And as he gives it to her she begins to sing
                </em>
              </p>
              <p className="song">
                <em>
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                </em>
              </p>
              <p className="song">
                <em>
                  In a couple of years they have built
                  A home sweet home
                  With a couple of kids running in the yard
                  Of Desmond and Molly Jones
                </em>
              </p>
              <p className="song">
                <em>
                  Happy ever after in the market place
                  Desmond lets the children lend a hand
                  Molly stays at home and does her pretty face
                  And in the evening she still sings it with the band
                </em>
              </p>
              <p className="song">
                <em>
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                </em>
              </p>
              <p className="song">
                <em>
                  In a couple of years they have built
                  A home sweet home
                  With a couple of kids running in the yard
                  Of Desmond and Molly Jones
                </em>
              </p>
              <p className="song">
                <em>
                  Happy ever after in the market place
                  Molly lets the children lend a hand
                  Desmond stays at home and does his pretty face
                  And in the evening he&#39;s a singer with the band
                </em>
              </p>
              <p className="song">
                <em>
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                </em>
              </p>
              <p className="song">
                <em>
                  And if you want some fun sing ob la di bla da
                </em>
              </p>
            </div>
          </div>
        );
    }
  }

  render() {
    const close = (
      <a href={null} className="modal_handle" onClick={this.handleClick}>
        <svg width="15" height="15" viewBox="0 0 15 15">
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
