import React from 'react';
import ListItem from './ListItem';
import { SUBTITLE_TAG } from '../../../server/configurations/Articles';

/*
  We want to show content... let's call it article
*/

class Article extends React.Component {

  // why should we rerender? let us think about this...
  shouldComponentUpdate(nextProps) {
    const device = nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== this.props.viewport.width;
    if (device || viewport) {
      return true;
    }
    return false;
  }

  render() {
    const { type,
            device,
            viewport,
            id,
            category,
            heading: { title, subtitle, infos, media },
            titleTag,
            openModal,
          } = this.props;

    const articleIncipit = {
      device,
      viewport,
      id,
      category,
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
          <ListItem {...articleIncipit} />
        );
      default:
        return (
          <article className="detail">
            {title}
          </article>
        );
    }
  }
}

Article.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  id: React.PropTypes.string,
  category: React.PropTypes.string,
  heading: React.PropTypes.instanceOf(Object),
  titleTag: React.PropTypes.string,
  type: React.PropTypes.string,
  openModal: React.PropTypes.func,
};

Article.defaultProps = {
  device: '',
  viewport: {},
  id: '',
  category: '',
  heading: {},
  titleTag: '',
  type: '',
  openModal: () => {},
};

export default Article;
