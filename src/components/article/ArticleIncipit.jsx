import React from 'react';
import Image from '../common/Image';
import Gallery from '../gallery/Gallery';

class ArticleIncipit extends React.Component {

  addHeading() {
    const title = this.props.title;
    const subtitle = this.props.subtitle;
    const heading = {};

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
        output = <div className="media"><Gallery src={media[0].src} class={'mediael'} alt={this.props.title} /></div>;
      } else {
        output = <div className="media"><Image src={media[0].src} class={'mediael'} alt={this.props.title} /></div>;
      }
    }
    return output;
  }

  render() {
    const heading = this.addHeading();
    const media = this.addMedia();
    return (
      <header>
        {media}
        {heading.title}
        {heading.subtitle}
      </header>
    );
  }
}

ArticleIncipit.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  media: React.PropTypes.instanceOf(Array),
  headingTag: React.PropTypes.string,
};

ArticleIncipit.defaultProps = {
  title: '',
  subtitle: '',
  media: [],
  headingTag: '',
};

export default ArticleIncipit;

