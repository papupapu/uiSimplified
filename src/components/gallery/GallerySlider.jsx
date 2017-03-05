import React from 'react';
import Image from '../common/Image';

const MAX_TO_LOAD = 3;

class GallerySlider extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      device: this.props.device,
      sizes: this.props.sizes,
      alreadyLoaded: 1,
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      isUp: false,
    };

    this.createSlides = this.createSlides.bind(this);
  }

  componentDidMount() {
    this.slider.style.width = `${this.props.sizes[0] * this.props.media.length}px`;
    this.slider.style.height = `${this.props.sizes[1]}px`;
  }

  createSlides() {
    const slides = [];
    this.props.media.forEach(
      (el, index) => {
        const key = `slide-${index}`;
        slides.push(<li key={key} style={{ width: `${this.props.sizes[0]}px` }}><Image src={el.src} alt={key} /></li>);
      },
    );
    return slides;
  }

  render() {
    const slides = this.createSlides();
    return (
      <div>
        <ul className={this.state.device === 'desktop' ? 'slider notouch' : 'slider'} ref={(slider) => { this.slider = slider; }}>
          {slides}
        </ul>
        {
          this.state.device === 'desktop' ?
            <a href="" className="prev" ref={(prev) => { this.prev = prev; }}><svg enableBackground="new 0 0 137.065 137.064" height="137.064" viewBox="0 0 137.065 137.064" width="137.065" xmlns="http://www.w3.org/2000/svg"><path d="m55.12 68.532 51.606-51.614c2.738-2.734 2.738-7.173 0-9.911l-4.955-4.956c-2.737-2.736-7.173-2.736-9.91 0l-61.524 61.526c-2.736 2.736-2.736 7.173 0 9.911l61.524 61.523c2.737 2.737 7.173 2.737 9.91 0l4.955-4.955c2.738-2.738 2.738-7.177 0-9.911z" /></svg></a>
          :
            null
        }
        {
          this.state.device === 'desktop' ?
            <a href="" className="next" ref={(next) => { this.next = next; }}><svg enableBackground="new 0 0 137.065 137.064" height="137.064" viewBox="0 0 137.065 137.064" width="137.065" xmlns="http://www.w3.org/2000/svg"><path d="m55.12 68.532 51.606-51.614c2.738-2.734 2.738-7.173 0-9.911l-4.955-4.956c-2.737-2.736-7.173-2.736-9.91 0l-61.524 61.526c-2.736 2.736-2.736 7.173 0 9.911l61.524 61.523c2.737 2.737 7.173 2.737 9.91 0l4.955-4.955c2.738-2.738 2.738-7.177 0-9.911z" /></svg></a>
          :
            null
        }
      </div>
    );
  }

}

GallerySlider.propTypes = {
  device: React.PropTypes.string,
  media: React.PropTypes.instanceOf(Array),
  sizes: React.PropTypes.instanceOf(Array),
};

GallerySlider.defaultProps = {
  device: '',
  media: [],
  sizes: [],
};

export default GallerySlider;
