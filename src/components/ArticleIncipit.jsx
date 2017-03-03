import React from 'react';
import '../css/base.css';
import Image from './common/Image';

class ArticleIncipit extends React.Component {

  SEOTitle() {
    const textTitle = this.props.title;
    let htmlTitle;

    switch (this.props.headingTag) {
      case 'h2':
        htmlTitle = <h2>{textTitle}</h2>;
        break;
      case 'h3':
        htmlTitle = <h3>{textTitle}</h3>;
        break;
      case 'h4':
        htmlTitle = <h4>{textTitle}</h4>;
        break;
      case 'h5':
        htmlTitle = <h5>{textTitle}</h5>;
        break;
      case 'h6':
        htmlTitle = <h6>{textTitle}</h6>;
        break;
      default:
        htmlTitle = <h1>{textTitle}</h1>;
    }
    return htmlTitle;
  }

  addMedia() {
    const media = this.props.media;
    let output;
    if (media.length > 0) {
      if (media.length > 1) {
        output = 'gallery';
      } else {
        output = <Image src={media[0].src} class={'mediael'} alt={this.props.title} />;
      }
    }
    return output;
  }

  render() {
    const title = this.SEOTitle();
    const media = this.addMedia();
    const paragraph = this.props.paragraph;

    return (
      <div className="item">
        {media}
        {title}
        <p>{paragraph}</p>
      </div>
    );
  }
}

ArticleIncipit.propTypes = {
  title: React.PropTypes.string,
  paragraph: React.PropTypes.string,
  media: React.PropTypes.instanceOf(Array),
  headingTag: React.PropTypes.string,
};

ArticleIncipit.defaultProps = {
  title: '',
  paragraph: '',
  media: [],
  headingTag: '',
};

export default ArticleIncipit;

