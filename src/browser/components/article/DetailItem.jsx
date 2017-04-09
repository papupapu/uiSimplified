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
      const mediaElements = this.article.querySelectorAll('.media');
      const h = Math.floor((70 * this.article.offsetWidth) / 100) > 724 ?
                  724
                :
                  Math.floor((70 * this.article.offsetWidth) / 100);
      mediaElements.forEach(
        (el) => {
          const domEl = el;
          domEl.style.height = `${h}px`;
        },
      );
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
      const mediaElements = this.article.querySelectorAll('.media');
      const h = Math.floor((70 * this.article.offsetWidth) / 100) > 724 ?
                  724
                :
                  Math.floor((70 * this.article.offsetWidth) / 100);
      mediaElements.forEach(
        (el) => {
          const domEl = el;
          domEl.style.height = `${h}px`;
        },
      );
      return true;
    }
    return false;
  }

  formatUnorderedList(ul) {
    const list = [];
    ul.value.forEach(
      (el, index) => {
        const n = index + 1;
        const listItem = el.value.label ?
          <li key={`${el.type}-${ul.value}-${n}`}><span>{el.value.label}</span> {el.value.value}</li>
        :
          <li key={`${el.type}-${ul.value}-${n}`}>{el.value}</li>;
        list.push(listItem);
      },
    );
    return list;
  }

  formatDetailBody() {
    const { device, viewport, body, heading: { title, media } } = this.props;
    const detailBody = [];
    const detailBodyMedia = media.slice(0);
    const closingMediaFlag = true;
    let list = [];
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
          case 'quote':
            if (el.author) {
              detailBody.push(<blockquote key={`${el.type}-${n}`} className="dbp">{el.value} <span>{el.author}</span></blockquote>);
            } else {
              detailBody.push(<blockquote key={`${el.type}-${n}`} className="dbp">{el.value}</blockquote>);
            }
            break;
          case 'ul':
            list = this.formatUnorderedList(el);
            detailBody.push(<ul key={`${el.type}-${n}`} className="dbp">{list}</ul>);
            break;
          case 'media':
            if (el.value.length > 1) {
              detailBody.push(<div key={`${el.type}-${n}`} className="media"><Gallery media={el.value} class={'mediael'} device={device} viewport={viewport} /></div>);
            } else {
              detailBody.push(<div key={`${el.type}-${n}`} className="media"><Image src={el.value[0].src} cssClassName={'mediael'} alt={title} /></div>);
            }
            break;
          default:
            break;
        }
      },
    );
    if (closingMediaFlag && detailBodyMedia.length > 1) {
      if (detailBodyMedia.length > 2) {
        const mediaMinusFirst = detailBodyMedia.splice(1);
        detailBody.push(<div key="closingMedia" className="media closing"><Gallery media={mediaMinusFirst} class={'mediael'} device={device} viewport={viewport} /></div>);
      } else {
        detailBody.push(<div key="closingMedia" className="media closing"><Image src={media[1].src} cssClassName={'mediael'} alt={title} /></div>);
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
        <Image src={coverImage} cssClassName={'cover'} alt={title} />
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

