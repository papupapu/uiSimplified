import React from 'react';
import Image from '../common/Image';
import GallerySlider from './GallerySlider';
import './Gallery.css';

class Gallery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      type: 'photo',
    };
  }

  componentDidMount() {
    this.setSliderMediaUp();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.device !== '' && nextProps.device !== this.props.device) {
      this.sliderSizes = [this.gallery.offsetWidth, this.gallery.offsetHeight];
      this.sliderObj = {
        media: this.photoArray,
        sizes: this.sliderSizes,
        device: nextProps.device,
      };
    }
  }

  setSliderMediaUp() {
    const { media } = this.props;
    this.photoArray = media.filter((el) => { if (el.type === 'photo') { return el; } return false; });
  }

  render() {
    const sliderObj = this.sliderObj;
    return (
      <div className={this.props.class !== '' ? `${this.props.class} gallery` : 'gallery'} ref={(gallery) => { this.gallery = gallery; }}>
        {
          this.props.device === '' ?
            <Image src={this.props.media[0].src} alt={this.props.device} />
          :
            <GallerySlider {...sliderObj} />
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
