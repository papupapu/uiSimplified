import React from 'react';
import Image from '../common/Image';
import GallerySlider from './GallerySlider';
import './Gallery.css';

class Gallery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className={this.props.class !== '' ? `${this.props.class} gallery` : 'gallery'} ref={(gallery) => { this.gallery = gallery; }}>
        {
          this.props.device === '' ?
            <Image src={this.props.media[0].src} alt={this.props.device} />
          :
            <GallerySlider media={this.props.media} />
        }
      </div>
    );
  }

}

Gallery.propTypes = {
  device: React.PropTypes.string,
  media: React.PropTypes.instanceOf(Array),
  class: React.PropTypes.string,
};

Gallery.defaultProps = {
  device: '',
  media: [],
  class: '',
};

export default Gallery;
