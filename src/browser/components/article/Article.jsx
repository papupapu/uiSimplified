import React from 'react';
import ArticleListItem from './ArticleListItem';
import { SUBTITLE_TAG } from '../../../server/configurations/Articles';
import './Article.css';

/*
  We want to show content... let's call it article
*/

class Article extends React.Component {

  // why should we rerender? let us think about this...
  shouldComponentUpdate(nextProps) {
    const device = nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== this.props.viewport.width;
    if ((device || viewport) && this.props.heading.media.length > 1) {
      return true;
    }
    return false;
  }

  render() {
    const { type,
            device,
            viewport,
            heading: { title, subtitle, infos, media },
            titleTag,
            openModal,
          } = this.props;

    const articleIncipit = {
      device,
      viewport,
      title,
      subtitle,
      infos,
      media,
      titleTag,
      subtitleTag: SUBTITLE_TAG[titleTag],
      openModal,
    };

    switch (type) {
      case 'list':
        return (
          <ArticleListItem {...articleIncipit} />
        );
      default:
        return (
          <article className="item">
            not ready
          </article>
        );
    }
  }
}

Article.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  heading: React.PropTypes.instanceOf(Object),
  titleTag: React.PropTypes.string,
  type: React.PropTypes.string,
  openModal: React.PropTypes.func,
};

Article.defaultProps = {
  device: '',
  viewport: {},
  heading: {},
  titleTag: '',
  type: '',
  openModal: () => {},
};

export default Article;
