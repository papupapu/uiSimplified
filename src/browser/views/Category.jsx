import React from 'react';

import Article from '../components/article/Article';
import List from '../components/common/List';

import { ARTICLELIST_MAX_ITEMS } from '../../server/configurations/Articles';
import { articleList } from '../../server/static/Articles';

class Category extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // why should we rerender? let us think about this...
  shouldComponentUpdate(nextProps) {
    const device = nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== this.props.viewport.width;
    if (device || viewport) {
      return true;
    }
    return false;
  }

  mainArticle() {
    const { device, viewport, categoryName, openModal } = this.props;
    const list = articleList.filter(article => article.category === categoryName);
    const articleObj = {
      device,
      viewport,
      id: list[0].id,
      category: list[0].category,
      heading: list[0].heading,
      body: list[0].body,
      titleTag: 'h2',
      type: 'listCover',
      openModal,
    };
    return (
      <Article {...articleObj} />
    );
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
        list={list.splice(1)}
        contentType={'articles'}
        openModal={openModal}
      />
    );
  }

  render() {
    const { categoryName } = this.props;
    const mainArticle = this.mainArticle();
    const content = this.articlesList('h3', 5);
    return (
      <div className="mainListing category">
        <h1 className="categoryTitle">{categoryName}</h1>
        {mainArticle}
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
