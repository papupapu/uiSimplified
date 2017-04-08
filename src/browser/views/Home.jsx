import React from 'react';

import List from '../components/common/List';

import { ARTICLELIST_MAX_ITEMS } from '../../server/configurations/Articles';
import { articleList } from '../../server/static/Articles';

class Home extends React.Component {

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
    const { device, viewport, openModal } = this.props;
    return (
      <List
        titleTag={titleTag}
        device={device}
        viewport={viewport}
        maxToShow={maxToShow}
        list={articleList}
        contentType={'articles'}
        openModal={openModal}
      />
    );
  }

  render() {
    const content = this.articlesList('h3');
    return (
      <div className="mainListing">
        <article>
          <h1>hp</h1>
        </article>
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
