import React from 'react';
// UI elements
import Image from '../common/Image';
import Gallery from '../gallery/Gallery';
// Product related elements
import SEOTag from '../../../common/helpers/SEOTag';
import PRODUCTInfos from '../../../common/helpers/PRODUCTInfos';

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
    const { title, titleTag, subtitle, subtitleTag, infos } = this.props;
    const media = this.addMedia();
    const css = Object.keys(infos).length > 0 ? 'casa' : null;
    const actions = Object.keys(infos).length > 0 ?
      <p className="actions"><strong>sonolameglioagenzia</strong> chiamami | salvami</p>
    :
      null;
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
};

export default ArticleListItem;

