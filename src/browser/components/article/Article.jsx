import React from 'react';
import ListItem from './ListItem';
import DetailItem from './DetailItem';
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
            heading,
            heading: { title, subtitle, infos, media },
            titleTag,
            body,
            openModal,
          } = this.props;

    const listItemObj = {
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

    const detailItemObj = {
      device,
      viewport,
      id,
      category,
      heading,
      titleTag,
      subtitleTag: SUBTITLE_TAG[titleTag],
      body,
      openModal,
    };

    switch (type) {
      case 'list':
        return (
          <ListItem {...listItemObj} />
        );
      default:
        return (
          <DetailItem {...detailItemObj} />
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
  body: React.PropTypes.instanceOf(Array),
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
  body: [],
  titleTag: '',
  type: '',
  openModal: () => {},
};

export default Article;
