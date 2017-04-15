import React from 'react';

import Article from '../components/article/Article';
import List from '../components/common/List';

import { ARTICLELIST_MAX_ITEMS } from '../../server/configurations/Articles';
import { articleList } from '../../server/static/Articles';

class Home extends React.Component {

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
    const { device, viewport, openModal } = this.props;
    const article = articleList.slice(0);
    return (
      <Article
        device={device}
        viewport={viewport}
        titleTag={'h2'}
        type={'listCover'}
        {...article[0]}
        openModal={openModal}
      />
    );
  }

  articlesList(titleTag, maxToShow = ARTICLELIST_MAX_ITEMS) {
    const { device, viewport, openModal } = this.props;
    const list = articleList.slice(0);
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
    const mainArticle = this.mainArticle();
    const content = this.articlesList('h3');
    return (
      <div className="mainListing">
        {mainArticle}
        <div className="sw">{content}</div>
      </div>
    );
  }
}

Home.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  openModal: React.PropTypes.func,
};

Home.defaultProps = {
  device: '',
  viewport: {},
  openModal: () => {},
};

export default Home;
