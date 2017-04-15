import React from 'react';
import { Link } from 'react-router-dom';

import Image from '../common/Image';
import Gallery from '../gallery/Gallery';

import './CoverItem.css';

import SEOTag from '../common/helpers/SEOTag';
import PRODUCTInfos from '../common/helpers/PRODUCTInfos';
import CorrectMediaSizes from '../common/helpers/CorrectMediaSizes';

import Calendar from '../common/graphic/Calendar';
import Baloon from '../common/graphic/Baloon';

class CoverItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isInViewport: false,
    };

    this.waitingForASignal = true;
    this.isInViewport = this.isInViewport.bind(this);
    this.checkViewport = this.checkViewport.bind(this);
  }

  componentWillMount() {
    window.addEventListener('scroll', this.checkViewport);
  }

  componentDidMount() {
    this.checkViewport();
    this.article.querySelector('.cover').style.height = `${Math.floor((70 * this.article.offsetWidth) / 100)}px`;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const device = nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== this.props.viewport.width;
    const isInViewport = nextState.isInViewport !== this.state.isInViewport;
    if (device || viewport) {
      /*
        Just plain horrible!!!
        Looks like iOS devices will compute height percentages wrong.
        Need to set the height of the gallery/image container in px as soon as we can.

        TODO:
        look for a media query solutions to keep layout measures computing separated from APP logic
      */
      if (nextProps.viewport.width <= '568') {
        this.article.querySelector('.cover').style.height = `${Math.floor((70 * this.article.offsetWidth) / 100)}px`;
      } else {
        this.article.querySelector('.cover').style.height = '';
      }
      return true;
    } else if (isInViewport) {
      if (nextProps.viewport.width <= '568') {
        this.article.querySelector('.cover').style.height = `${Math.floor((70 * this.article.offsetWidth) / 100)}px`;
      } else {
        this.article.querySelector('.cover').style.height = '';
      }
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkViewport);
  }

  isInViewport() {
    const rect = this.article.getBoundingClientRect();
    const viewportHeight = (window.innerHeight || document.documentElement.clientHeight);
    return (
      rect.bottom >= 0 &&
      rect.top < viewportHeight
    );
  }

  checkViewport() {
    if (this.isInViewport() && this.waitingForASignal) {
      this.waitingForASignal = false;
      this.setState(
        { isInViewport: true },
        () => {
          window.removeEventListener('scroll', this.checkViewport);
        },
      );
    }
  }

  addMedia() {
    const { device, id, category, media } = this.props;
    const detailUrl = `/${category}/${id}`;
    let output = null;
    if (!this.state.isInViewport) {
      // TODO: no script tag for SEO
      output = <div className="media" />;
      return output;
    }
    if (media.length > 0) {
      const readyForResponsive = CorrectMediaSizes('smartphone', category, media);
      if (readyForResponsive.length > 1) {
        output = <div className="media"><Gallery media={readyForResponsive} slidesLinkTo={detailUrl} cssClassName={'mediael'} device={this.props.device} viewport={this.props.viewport} /></div>;
      } else {
        output = <div className="media"><Link to={detailUrl}><Image src={readyForResponsive[0].src} cssClassName={'mediael'} alt={this.props.title} /></Link></div>;
      }
    }
    return output;
  }

  render() {
    const {
      device, id, category, title, titleTag, subtitle, subtitleTag, infos, openModal,
    } = this.props;
    const detailUrl = `/${category}/${id}`;
    const media = this.addMedia();
    const css = Object.keys(infos).length > 0 ? 'casa' : null;
    const coverImage = CorrectMediaSizes(device, category, this.props.media[0].src);
    const actions = (
      <div className="actions">
        <p>
          <strong>sonolameglioagenzia</strong>
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
      </div>
      );
    return (
      <article className="articleCoverItem" ref={(article) => { this.article = article; }}>
        <header className={css}>
          <PRODUCTInfos
            infos={infos}
          />
          <SEOTag
            tag={titleTag}
            value={title}
            cssClassName={'title'}
            url={detailUrl}
          />
          <SEOTag
            tag={subtitleTag}
            value={subtitle}
            cssClassName={'subtitle'}
            url={detailUrl}
          />
          {actions}
        </header>
        <Image src={coverImage} cssClassName={'cover'} alt={title} />
      </article>
    );
  }
}

CoverItem.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  id: React.PropTypes.string,
  category: React.PropTypes.string,
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  infos: React.PropTypes.instanceOf(Object),
  media: React.PropTypes.instanceOf(Array),
  titleTag: React.PropTypes.string,
  subtitleTag: React.PropTypes.string,
  openModal: React.PropTypes.func,
};

CoverItem.defaultProps = {
  device: '',
  viewport: {},
  id: '',
  category: '',
  title: '',
  subtitle: '',
  infos: {},
  media: [],
  titleTag: '',
  subtitleTag: '',
  openModal: () => {},
};

export default CoverItem;

