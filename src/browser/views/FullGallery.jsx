import React from 'react';
import { Route } from 'react-router';

import Gallery from '../components/gallery/Gallery';

import NotFound from './NotFound';

import CorrectMediaSizes from '../components/common/helpers/CorrectMediaSizes';

import { articleList } from '../../server/static/Articles';

class FullGallery extends React.Component {

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

  fetchGallery() {
    const { device, viewport, detailId } = this.props;
    const detail = articleList.filter(article => article.id === detailId);
    const gallery = {};
    if (detail.length > 0) {
      gallery.device = device;
      gallery.viewport = viewport;
      gallery.category = detail[0].category;
      gallery.title = detail[0].heading.title;
      gallery.media = CorrectMediaSizes(device, detail[0].category, detail[0].heading.media);
      gallery.type = 'fullPage';
      return gallery;
    }
    return null;
  }

  render() {
    const gallery = this.fetchGallery();
    if (gallery) {
      return (
        <div className="fullPage">
          <Gallery {...gallery} />
        </div>
      );
    }
    return (
      <Route component={NotFound} />
    );
  }
}

FullGallery.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  detailId: React.PropTypes.string,
};

FullGallery.defaultProps = {
  device: '',
  viewport: {},
  detailId: '',
};

export default FullGallery;
