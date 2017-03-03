import React from 'react';
import Image from './common/Image';
import Gallery from './gallery/Gallery';
import '../css/base.css';

class ArticleIncipit extends React.Component {

  SEOheading() {
    const title = this.props.title;
    const subtitle = this.props.subtitle;
    const heading = {};

    switch (this.props.headingTag) {
      case 'h2':
        heading.title = <h2>{title}</h2>;
        heading.subtitle = <h3>{subtitle}</h3>;
        break;
      case 'h3':
        heading.title = <h3>{title}</h3>;
        heading.subtitle = <h4>{subtitle}</h4>;
        break;
      case 'h4':
        heading.title = <h4>{title}</h4>;
        heading.subtitle = <h5>{subtitle}</h5>;
        break;
      case 'h5':
        heading.title = <h5>{title}</h5>;
        heading.subtitle = <h6>{subtitle}</h6>;
        break;
      case 'h6':
        heading.title = <h6>{title}</h6>;
        heading.subtitle = <p>{subtitle}</p>;
        break;
      default:
        heading.title = <h1>{title}</h1>;
        heading.subtitle = <h2>{subtitle}</h2>;
    }

    return heading;
  }

  addMedia() {
    const media = this.props.media;
    let output;
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
    const heading = this.SEOheading();
    const media = this.addMedia();

    return (
      <article className="item">
        {media !== null ? media : null}
        {heading.title}
        {heading.subtitle}
      </article>
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

