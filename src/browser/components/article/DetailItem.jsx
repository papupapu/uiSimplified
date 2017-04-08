import React from 'react';

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

  componentDidMount() {
    const { heading: { media } } = this.props;
    if (media.length > 1) {
      this.article.querySelector('.media').style.height = `${Math.floor((70 * this.article.offsetWidth) / 100)}px`;
    }
  }

  shouldComponentUpdate(nextProps) {
    const device = nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== this.props.viewport.width;
    if (device || viewport) {
      /*
        Just plain horrible!!!
        Looks like iOS devices will compute height percentages wrong.
        Need to set the height of the gallery/image container in px as soon as we can.

        TODO:
        look for a media query solutions to keep layout measures computing separated from APP logic
      */
      if (nextProps.viewport.width <= '568') {
        this.article.querySelector('.media').style.height = `${Math.floor((70 * this.article.offsetWidth) / 100)}px`;
      } else {
        this.article.querySelector('.media').style.height = '';
      }
      return true;
    }
    return false;
  }

  formatDetailBody() {
    const { device, viewport, body, heading: { title, media } } = this.props;
    const detailBody = [];
    const detailBodyMedia = media.slice(0);
    const closingMediaFlag = true;
    body.forEach(
      (el, index) => {
        const n = index + 1;
        switch (el.type) {
          case 'h3':
            detailBody.push(<h3 key={`${el.type}-${n}`} className="dbt">{el.value}</h3>);
            break;
          case 'p':
            detailBody.push(<p key={`${el.type}-${n}`} className="dbp">{el.value}</p>);
            break;
          default:
            break;
        }
      },
    );
    if (closingMediaFlag && detailBodyMedia.length > 1) {
      if (detailBodyMedia.length > 2) {
        const mediaMinusFirst = detailBodyMedia.splice(1);
        detailBody.push(<div key="closingMedia" className="media"><Gallery media={mediaMinusFirst} class={'mediael'} device={device} viewport={viewport} /></div>);
      } else {
        detailBody.push(<div key="closingMedia" className="media"><Image src={media[1].src} class={'mediael'} alt={title} /></div>);
      }
    }
    return detailBody;
  }

  render() {
    const {
      id,
      // category,
      heading: { title, subtitle, infos, media },
      titleTag,
      subtitleTag,
      // openModal,
    } = this.props;
    const css = Object.keys(infos).length > 0 ? 'casa' : null;
    const coverImage = media[0].src;
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
      <article className="articleDetailItem" ref={(article) => { this.article = article; }} id={id}>
        <header className={css}>
          <PRODUCTInfos
            infos={infos}
          />
          <SEOTag
            tag={titleTag}
            value={title}
          />
          <SEOTag
            tag={subtitleTag}
            value={subtitle}
          />
        </header>
        <Image src={coverImage} class={'cover'} alt={title} />
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

