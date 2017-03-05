import React from 'react';
import ArticleIncipit from './ArticleIncipit';
import './Article.css';

/*
  We want to show content... let's call it article
*/

class Article extends React.Component {

  // why should we rerender? let us think about this...
  shouldComponentUpdate(nextProps) {
    if (nextProps.device !== this.props.device && this.props.heading.media.length > 1) {
      return true;
    }
    return false;
  }

  articleIncipit() {
    const heading = this.props.heading;
    const data = {
      device: this.props.device,
      title: heading.title,
      subtitle: heading.subtitle,
      media: heading.media,
      headingTag: this.props.headingTag,
    };
    return data;
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
  heading: React.PropTypes.instanceOf(Object),
  headingTag: React.PropTypes.string,
};

Article.defaultProps = {
  device: '',
  heading: {},
  headingTag: '',
};

export default Article;
