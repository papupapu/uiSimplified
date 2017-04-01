import React from 'react';
// UI elements
import Image from '../common/Image';
import Gallery from '../gallery/Gallery';
// Product related elements
import SEOTag from '../../../common/helpers/SEOTag';
import PRODUCTInfos from '../../../common/helpers/PRODUCTInfos';

import { MAIL } from '../../../common/graphic/SVGCodes';


class ArticleListItem extends React.Component {

  shouldComponentUpdate(nextProps) {
    const device = nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== this.props.viewport.width;
    if ((device || viewport) && this.props.media.length > 1) {
      return true;
    }
    return false;
  }

  addMedia() {
    const { media } = this.props;
    let output = null;
    if (media.length > 0) {
      if (media.length > 1) {
        output = <div className="media"><Gallery media={media} class={'mediael'} device={this.props.device} viewport={this.props.viewport} /></div>;
      } else {
        output = <div className="media"><Image src={media[0].src} class={'mediael'} alt={this.props.title} /></div>;
      }
    }
    return output;
  }

  render() {
    const { title, titleTag, subtitle, subtitleTag, infos, openModal } = this.props;
    const media = this.addMedia();
    const css = Object.keys(infos).length > 0 ? 'casa' : null;
    const actions = (
      <p className="actions">
        <strong>sonolameglioagenzia</strong>
        &nbsp;
        <a
          href=""
          className="modal_handle"
          onClick={(evt) => { evt.preventDefault(); openModal(evt, { title, subtitle }); }}
        >
          <svg height="19" viewBox="0 0 26 19">
            <mask id="a" fill="#fff">
              <path d={MAIL.a} fill="none" />
            </mask>
            <path
              d={MAIL.b}
              fill="#333f48"
              fillRule="evenodd"
              mask="url(#a)"
              transform=""
            />
          </svg>
        </a>
        &nbsp;|&nbsp;
        salvami
      </p>
      );
    return (
      <article className="item">
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
          {media}
          {actions}
        </header>
      </article>
    );
  }
}

ArticleListItem.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  infos: React.PropTypes.instanceOf(Object),
  media: React.PropTypes.instanceOf(Array),
  titleTag: React.PropTypes.string,
  subtitleTag: React.PropTypes.string,
  openModal: React.PropTypes.func,
};

ArticleListItem.defaultProps = {
  device: '',
  viewport: {},
  title: '',
  subtitle: '',
  infos: {},
  media: [],
  titleTag: '',
  subtitleTag: '',
  openModal: () => {},
};

export default ArticleListItem;

