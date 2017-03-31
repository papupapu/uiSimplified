import React from 'react';
import Image from '../common/Image';
import Gallery from '../gallery/Gallery';
import SEOTag from '../../../common/helpers/HtmlFormatting';

class ArticleIncipit extends React.Component {

  shouldComponentUpdate(nextProps) {
    const device = nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== this.props.viewport.width;
    if ((device || viewport) && this.props.media.length > 1) {
      return true;
    }
    return false;
  }

  addHeading() {
    const heading = {};
    const formattedHeading = SEOHeading(
      this.props.headingTag,
      this.props.title,
      this.props.subtitle,
    );
    heading.title = formattedHeading.title;
    heading.subtitle = formattedHeading.subtitle;
    heading.infos = SEOInfos(this.props.infos);
    this.casa = heading.infos !== null;
    return heading;
  }

  addMedia() {
    const media = this.props.media;
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
    const { title, subtitle } = this.props;
    const media = this.addMedia();
    const css = this.casa !== null && this.casa !== undefined && this.casa ? 'casa' : null;
    const actions = this.casa !== null && this.casa !== undefined && this.casa ?
      <p className="actions"><strong>sonolameglioagenzia</strong> chiamami | salvami</p>
    :
      null;
    return (
      <header className={css}>
        <SEOTag
          tag={'h3'}
          value={title}
        />
        <SEOTag
          tag={'h4'}
          value={subtitle}
        />
        {media}
        {actions}
      </header>
    );
  }
}

ArticleIncipit.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  infos: React.PropTypes.instanceOf(Object),
  media: React.PropTypes.instanceOf(Array),
  headingTag: React.PropTypes.string,
};

ArticleIncipit.defaultProps = {
  device: '',
  viewport: {},
  title: '',
  subtitle: '',
  infos: {},
  media: [],
  headingTag: '',
};

export default ArticleIncipit;

