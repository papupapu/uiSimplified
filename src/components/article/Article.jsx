import React from 'react';
import ArticleIncipit from './ArticleIncipit';
import './Article.css';

class Article extends React.Component {

  articleIncipit() {
    const heading = {
      title: this.props.title,
      subtitle: this.props.subtitle,
      media: this.props.media,
      headingTag: this.props.headingTag,
    };
    return heading;
  }

  render() {
    const articleIncipit = this.articleIncipit();
    return (
      <article className="item">
        <ArticleIncipit {...articleIncipit} />
      </article>
    );
  }
}

Article.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  media: React.PropTypes.instanceOf(Array),
  headingTag: React.PropTypes.string,
};

Article.defaultProps = {
  title: '',
  subtitle: '',
  media: [],
  headingTag: '',
};

export default Article;

