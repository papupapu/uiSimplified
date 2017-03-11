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
      isUp: false,
    };

    this.cur = 0;
    this.startX = 0;
    this.startY = 0;
    this.deltaX = 0;
    this.deltaY = 0;

    this.createSlides = this.createSlides.bind(this);

    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
  }

  componentDidMount() {
    this.slider.style.width = `${this.props.sizes[0] * this.props.media.length}px`;
    this.slider.style.height = `${this.props.sizes[1]}px`;
  }

  createSlides() {
    const slides = [];
    this.props.media.forEach(
      (el, index) => {
        if (index < MAX_TO_LOAD) {
          const key = `slide-${index}`;
          slides.push(<li key={key} style={{ width: `${this.props.sizes[0]}px`, height: `${this.props.sizes[1]}px` }}><Image src={el.src} alt={key} /></li>);
        }
      },
    );
    return slides;
  }

  touchStart(event) {
    const touches = event.touches[0];
    this.startX = touches.pageX;
    this.startY = touches.pageY;
    this.disableScroll();
  }

  touchMove(event) {
    const touches = event.touches[0];
    const deltaY = touches.pageY - this.startY;
    let deltaX = touches.pageX - this.startX;
    if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
      deltaX = 0;
    } else {
      deltaX += ((this.props.sizes[0] * this.cur) * -1);
      this.slider.style.transform = `translate(${deltaX}px,0)`;
    }
  }

  touchEnd(event) {
    this.enableScroll();
  }

  _preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;  
  }

  disableScroll() {
    window.ontouchmove  = this._preventDefault; // mobile
  }

  enableScroll() {
      window.ontouchmove = null;  
  }  

  render() {
    const slides = this.createSlides();
    return (
      <div className={this.state.device === 'desktop' ? 'slider notouch' : 'slider'} ref={(slider) => { this.slider = slider; }} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove}>
        <ul>
          {slides}
        </ul>
        {
          this.props.device === 'desktop' ?
            <a href="" className="prev" ref={(prev) => { this.prev = prev; }}><svg enableBackground="new 0 0 137.065 137.064" height="137.064" viewBox="0 0 137.065 137.064" width="137.065" xmlns="http://www.w3.org/2000/svg"><path d="m55.12 68.532 51.606-51.614c2.738-2.734 2.738-7.173 0-9.911l-4.955-4.956c-2.737-2.736-7.173-2.736-9.91 0l-61.524 61.526c-2.736 2.736-2.736 7.173 0 9.911l61.524 61.523c2.737 2.737 7.173 2.737 9.91 0l4.955-4.955c2.738-2.738 2.738-7.177 0-9.911z" /></svg></a>
          :
            null
        }
        {
          this.props.device === 'desktop' ?
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
