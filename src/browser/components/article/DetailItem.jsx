import React from 'react';
import { Link } from 'react-router-dom';

import './DetailItem.css';

import Image from '../common/Image';
import Gallery from '../gallery/Gallery';

import SEOTag from '../common/helpers/SEOTag';
import PRODUCTInfos from '../common/helpers/PRODUCTInfos';

import Calendar from '../common/graphic/Calendar';
import Baloon from '../common/graphic/Baloon';

class DetailItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    const device = nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== this.props.viewport.width;
    if (device || viewport) {
      return true;
    }
    return false;
  }

  formatDetailBody() {
    const { body } = this.props;
    const detailBody = [];
    body.forEach(
      (el, index) => {
        const n = index + 1;
        switch (el.type) {
          case 'h3':
            detailBody.push(<h3 key={`${el.type}-${n}`}>{el.value}</h3>);
            break;
          default: // P
            detailBody.push(<p key={`${el.type}-${n}`}>{el.value}</p>);
        }
      },
    );
    return detailBody;
  }

  render() {
    const {
      id,
      category,
      heading: { title, subtitle, infos, media },
      titleTag,
      subtitleTag,
      openModal,
    } = this.props;
    const css = Object.keys(infos).length > 0 ? 'casa' : null;
    const detailBody = this.formatDetailBody();
    /*
    const actions = (
      <p className="actions">
        <strong>{category}</strong>
        <a
          href=""
          className="modal_handle"
          onClick={(evt) => { evt.preventDefault(); openModal(evt, { title, subtitle }); }}
        >
          <Calendar />
        </a>
        <span>|</span>
        <a
          href=""
          data-action="sendMail"
          className="modal_handle"
          onClick={(evt) => { evt.preventDefault(); openModal(evt, { title, subtitle }); }}
        >
          <Baloon />
        </a>
      </p>
    );*/

    return (
      <article className="articleDetailItem" ref={(article) => { this.article = article; }}>
        <header className={css}>
          <SEOTag
            tag={titleTag}
            value={title}
          />
          <SEOTag
            tag={subtitleTag}
            value={subtitle}
          />
        </header>
        <Image src={media[0].src} class={'cover'} alt={title} />
        <div className="sw">
          {detailBody}
        </div>
      </article>
    );
  }
}

DetailItem.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  id: React.PropTypes.string,
  category: React.PropTypes.string,
  heading: React.PropTypes.instanceOf(Object),
  titleTag: React.PropTypes.string,
  subtitleTag: React.PropTypes.string,
  body: React.PropTypes.instanceOf(Array),
  openModal: React.PropTypes.func,
};

DetailItem.defaultProps = {
  device: '',
  viewport: {},
  id: '',
  category: '',
  heading: {},
  titleTag: '',
  subtitleTag: '',
  body: [],
  openModal: () => {},
};

export default DetailItem;

