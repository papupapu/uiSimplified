import React from 'react';
import Image from '../common/Image';
import { disableScroll, enableScroll } from '../../utils/HandleMobileScroll';

const MAX_TO_ADD = 3;
const MINIMUM_ON_CREATION = 2;

class GallerySlider extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      device: this.props.device,
      sizes: this.props.sizes,
      rerender: false,
    };

    this.cur = 0;
    this.tot = this.props.media.length;
    this.slidesCreated = MINIMUM_ON_CREATION;
    this.slidesToAdd = MAX_TO_ADD;
    this.startX = 0;
    this.startY = 0;
    this.deltaX = 0;
    this.deltaY = 0;

    this.createSlides = this.createSlides.bind(this);

    this.handleClick = this.handleClick.bind(this);

    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
  }

  componentWillMount() {
    this.slides = this.createSlides();
  }

  componentDidMount() {
    this.slider.style.width = `${this.props.sizes[0] * this.props.media.length}px`;
    this.slider.style.height = `${this.props.sizes[1]}px`;
  }

  createSlides() {
    const slides = [];
    this.props.media.forEach(
      (el, index) => {
        if (index < this.slidesCreated) {
          const key = `slide-${index}`;
          slides.push(<li key={key} style={{ width: `${this.props.sizes[0]}px`, height: `${this.props.sizes[1]}px` }}><Image src={el.src} alt={key} /></li>);
        }
      },
    );
    return slides;
  }

  sliderTransition() {
    this.slider.style.transition = 'transform .3s ease-out';
    setTimeout(
      () => {
        this.slider.style.transition = 'transform 0 ease-out';
      },
      315,
    );
  }

  sliderGoToCoords() {
    const coords = this.props.sizes[0] * this.cur;
    this.sliderTransition();
    this.slider.style.transform = `translate(-${coords}px,0)`;
    if (this.cur === this.slidesCreated - 1 && this.slidesCreated < this.tot) {
      this.slidesCreated = this.slidesCreated + this.slidesToAdd > this.tot ?
                              this.tot
                            :
                              this.slidesCreated + this.slidesToAdd;
      this.slides = this.createSlides();
      this.setState({ rerender: !this.state.rerender });
    }
  }

  handleClick(dir, event) {
    if (event) {
      event.preventDefault();
    }
    const cur = dir === 'next' ? this.cur + 1 : this.cur - 1;
    if ((dir === 'next' && cur < this.tot) || (dir === 'prev' && cur > -1)) {
      this.cur = cur;
      this.sliderGoToCoords();
    }
  }

  touchStart(event) {
    const touches = event.touches[0];
    this.startX = touches.pageX;
    this.startY = touches.pageY;
  }

  touchMove(event) {
    const touches = event.touches[0];
    const deltaY = touches.pageY - this.startY;
    const deltaX = touches.pageX - this.startX;
    if (Math.abs(deltaY) > 5 && Math.abs(deltaY) > Math.abs(deltaX) / 2) {
      this.deltaX = 0;
    } else {
      disableScroll();
      this.dir = deltaX < 0 ? 'next' : 'prev';
      if ((this.dir === 'next' && this.cur < this.tot - 1) || (this.dir === 'prev' && this.cur > 0)) {
        this.deltaX = deltaX;
        const coords = deltaX + ((this.props.sizes[0] * this.cur) * -1);
        this.slider.style.transform = `translate(${coords}px,0)`;
      }
    }
  }

  touchEnd() {
    enableScroll();
    if (Math.abs(this.deltaX) > this.props.sizes[0] / 4) {
      this.handleClick(this.dir);
    } else {
      this.sliderGoToCoords();
    }
    this.startX = 0;
    this.startY = 0;
    this.deltaX = 0;
  }

  render() {
    return (
      <div className="container">
        <div className={this.state.device === 'desktop' ? 'slider notouch' : 'slider'} ref={(slider) => { this.slider = slider; }} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove}>
          <ul>
            {this.slides}
          </ul>
        </div>
        {
          this.props.device === 'desktop' ?
            <a href="" onClick={(e) => { this.handleClick('prev', e); }} className="prev" ref={(prev) => { this.prev = prev; }}><svg enableBackground="new 0 0 137.065 137.064" height="137.064" viewBox="0 0 137.065 137.064" width="137.065" xmlns="http://www.w3.org/2000/svg"><path d="m55.12 68.532 51.606-51.614c2.738-2.734 2.738-7.173 0-9.911l-4.955-4.956c-2.737-2.736-7.173-2.736-9.91 0l-61.524 61.526c-2.736 2.736-2.736 7.173 0 9.911l61.524 61.523c2.737 2.737 7.173 2.737 9.91 0l4.955-4.955c2.738-2.738 2.738-7.177 0-9.911z" /></svg></a>
          :
            null
        }
        {
          this.props.device === 'desktop' ?
            <a href="" onClick={(e) => { this.handleClick('next', e); }} className="next" ref={(next) => { this.next = next; }}><svg enableBackground="new 0 0 137.065 137.064" height="137.064" viewBox="0 0 137.065 137.064" width="137.065" xmlns="http://www.w3.org/2000/svg"><path d="m55.12 68.532 51.606-51.614c2.738-2.734 2.738-7.173 0-9.911l-4.955-4.956c-2.737-2.736-7.173-2.736-9.91 0l-61.524 61.526c-2.736 2.736-2.736 7.173 0 9.911l61.524 61.523c2.737 2.737 7.173 2.737 9.91 0l4.955-4.955c2.738-2.738 2.738-7.177 0-9.911z" /></svg></a>
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
