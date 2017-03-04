import React from 'react';
import Image from '../common/Image';

class GallerySlider extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      maxToLoad: 5,
      alreadyLoaded: 1,
      span: 0,
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
    };

    this.createSlider = this.createSlider.bind(this);
  }

  createSlider() {


  }

  render() {
    return (
      <div ref={(span) => { this.span = span; }}>
        <Image src={this.props.media[0].src} alt={'aa'} />
        <a href="" className="prev" ref={(prev) => { this.prev = prev; }}>&lt;</a>
        <a href="" className="next" ref={(next) => { this.next = next; }}>&gt;</a>
      </div>
    );
  }

}

GallerySlider.propTypes = {
  media: React.PropTypes.instanceOf(Array),
};

GallerySlider.defaultProps = {
  media: [],
};

export default GallerySlider;
