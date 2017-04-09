import React from 'react';

import Article from '../components/article/Article';

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
    detail[0].titleTag = 'h1';
    detail[0].type = 'detail';
    detail[0].device = device;
    detail[0].viewport = viewport;
    return detail[0];
  }

  render() {
    const content = this.fetchDetail();
    return (
      <Article {...content} />
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
