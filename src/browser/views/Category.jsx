import React from 'react';

import List from '../components/common/List';

import { ARTICLELIST_MAX_ITEMS } from '../../server/configurations/Articles';
import { articleList } from '../../server/static/Articles';

class Category extends React.Component {

  // why should we rerender? let us think about this...
  shouldComponentUpdate(nextProps) {
    const device = nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== this.props.viewport.width;
    if (device || viewport) {
      return true;
    }
    return false;
  }

  articlesList(titleTag, maxToShow = ARTICLELIST_MAX_ITEMS) {
    const { device, viewport, categoryName, openModal } = this.props;
    const list = articleList.filter(article => article.category === categoryName);
    return (
      <List
        titleTag={titleTag}
        device={device}
        viewport={viewport}
        maxToShow={maxToShow}
        list={list}
        contentType={'articles'}
        openModal={openModal}
      />
    );
  }

  render() {
    const { categoryName } = this.props;
    const content = this.articlesList('h3', 5);
    return (
      <div className="mainListing">
        <article>
          <h1>{categoryName}</h1>
        </article>
        <div className="sw">{content}</div>
      </div>
    );
  }
}

Category.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  categoryName: React.PropTypes.string,
  openModal: React.PropTypes.func,
};

Category.defaultProps = {
  device: '',
  viewport: {},
  categoryName: '',
  openModal: () => {},
};

export default Category;
