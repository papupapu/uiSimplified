import React from 'react';
import ArticleIncipit from './ArticleIncipit';
import './Article.css';

/*
  We want to show content... let's call it article
*/

class Article extends React.Component {

  // why should we rerender? let us think about this...
  shouldComponentUpdate(nextProps) {
    if (nextProps.device !== this.props.device && this.props.media.length > 1) {
      return true;
    }
    return false;
  }

  articleIncipit() {
    const heading = {
      device: this.props.device,
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
  device: React.PropTypes.string,
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  media: React.PropTypes.instanceOf(Array),
  headingTag: React.PropTypes.string,
};

Article.defaultProps = {
  device: '',
  title: '',
  subtitle: '',
  media: [],
  headingTag: '',
};

export default Article;
