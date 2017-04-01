import React from 'react';
import Article from '../article/Article';

function List({ device, viewport, list, titleTag, maxToShow, contentType, openModal }) {
  if (list.length > 0) {
    const limit = maxToShow < list.length ? maxToShow : list.length;
    if (contentType === 'articles') {
      const articles = [];
      for (let i = 0; i < limit; i += 1) {
        const obj = list[i];
        obj.titleTag = titleTag;
        obj.device = device;
        obj.viewport = viewport;
        obj.type = 'list';
        obj.openModal = openModal;
        articles.push(<Article key={`article-${i}`} {...obj} />);
      }
      return (
        <div className="sw">{articles}</div>
      );
    }
    return null;
  }
  return null;
}

List.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  list: React.PropTypes.instanceOf(Array),
  titleTag: React.PropTypes.string,
  maxToShow: React.PropTypes.number,
  contentType: React.PropTypes.string,
  openModal: React.PropTypes.func,
};

List.defaultProps = {
  device: '',
  viewport: {},
  list: {},
  titleTag: '',
  maxToShow: 0,
  contentType: '',
  openModal: () => {},
};

export default List;
