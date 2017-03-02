import React from 'react';
import '../css/base.css';

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

  render() {
    const title = this.SEOTitle();
    const paragraph = this.props.paragraph;

    return (
      <div className="item">
        <div className="media">
          <img src="/images/surf.jpg" className="mediael" alt={this.props.title} />
        </div>
        {title}
        <p>{paragraph}</p>
      </div>
    );
  }
}

ArticleIncipit.propTypes = {
  title: React.PropTypes.string,
  paragraph: React.PropTypes.string,
  headingTag: React.PropTypes.string,
};

ArticleIncipit.defaultProps = {
  title: '',
  paragraph: '',
  headingTag: '',
};

export default ArticleIncipit;

