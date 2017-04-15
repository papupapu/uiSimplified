import React from 'react';
import { Route } from 'react-router';

import Article from '../components/article/Article';
import List from '../components/common/List';

import NotFound from './NotFound';

import { articleList } from '../../server/static/Articles';

class Detail extends React.Component {

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

  fetchDetail() {
    const { device, viewport, detailId } = this.props;
    const detail = articleList.filter(article => article.id === detailId);
    if (detail.length > 0) {
      detail[0].titleTag = 'h1';
      detail[0].type = 'detail';
      detail[0].device = device;
      detail[0].viewport = viewport;
      return detail[0];
    }
    return null;
  }

  fetchRelated() {
    const { device, viewport, detailId, detailCategory, openModal } = this.props;
    const related = articleList.filter(article =>
        article.category === detailCategory && article.id !== detailId);
    if (related.length > 0) {
      return (
        <List
          titleTag="h3"
          device={device}
          viewport={viewport}
          maxToShow={5}
          list={related}
          contentType={'articles'}
          openModal={openModal}
        />
      );
    }
    return null;
  }

  render() {
    const content = this.fetchDetail();
    const related = this.fetchRelated();
    if (content) {
      return (
        <div>
          <Article {...content} />
          {
            related &&
              <section className="sw related">
                <h3><strong>{this.props.detailCategory}</strong> more articles you may like</h3>
                {related}
              </section>
          }
        </div>
      );
    }
    return (
      <Route component={NotFound} />
    );
  }
}

Detail.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  detailId: React.PropTypes.string,
  detailCategory: React.PropTypes.string,
  openModal: React.PropTypes.func,
};

Detail.defaultProps = {
  device: '',
  viewport: {},
  detailId: '',
  detailCategory: '',
  openModal: () => {},
};

export default Detail;
