import React from 'react';
import Image from '../common/Image';
import Gallery from '../gallery/Gallery';

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
    const title = this.props.title;
    const subtitle = this.props.subtitle;
    const infos = this.props.infos;
    const heading = {};

    let textinfos = null;
    if (Object.keys(infos).length > 0) {
      textinfos = (<p className="infos">
        <strong>{infos.price}</strong>
        <span>{infos.mq}</span> {Object.keys(infos)[1]}.&nbsp;
        <span>{infos.locali}</span> {Object.keys(infos)[2]}&nbsp;
        <span>{infos.bagni}</span> {Object.keys(infos)[3]}</p>
      );
      this.casa = true;
    }
    heading.infos = textinfos;

    switch (this.props.headingTag) {
      case 'h2':
        heading.title = title !== '' && title !== undefined ? <h2>{title}</h2> : null;
        heading.subtitle = subtitle !== '' && subtitle !== undefined ? <h3>{subtitle}</h3> : null;
        break;
      case 'h3':
        heading.title = title !== '' && title !== undefined ? <h3>{title}</h3> : null;
        heading.subtitle = subtitle !== '' && subtitle !== undefined ? <h4>{subtitle}</h4> : null;
        break;
      case 'h4':
        heading.title = title !== '' && title !== undefined ? <h4>{title}</h4> : null;
        heading.subtitle = subtitle !== '' && subtitle !== undefined ? <h5>{subtitle}</h5> : null;
        break;
      case 'h5':
        heading.title = title !== '' && title !== undefined ? <h5>{title}</h5> : null;
        heading.subtitle = subtitle !== '' && subtitle !== undefined ? <h6>{subtitle}</h6> : null;
        break;
      case 'h6':
        heading.title = title !== '' && title !== undefined ? <h6>{title}</h6> : null;
        heading.subtitle = subtitle !== '' && subtitle !== undefined ? <p>{subtitle}</p> : null;
        break;
      default:
        heading.title = title !== '' && title !== undefined ? <h1>{title}</h1> : null;
        heading.subtitle = subtitle !== '' && subtitle !== undefined ? <h2>{subtitle}</h2> : null;
    }
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
    const heading = this.addHeading();
    const media = this.addMedia();
    const css = this.casa !== null && this.casa !== undefined && this.casa ? 'casa' : null;
    const actions = this.casa !== null && this.casa !== undefined && this.casa ?
      <p className="actions"><strong>sonolameglioagenzia</strong> chiamami | salvami</p>
    :
      null;
    return (
      <header className={css}>
        {heading.infos}
        {heading.title}
        {heading.subtitle}
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

