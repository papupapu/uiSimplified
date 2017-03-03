import React from 'react';
import Image from '../common/Image';
//import './Gallery.css';

class Gallery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="gallery" ref={(gallery) => { this.gallery = gallery; }}>
        <Image src={this.props.src} class={this.props.class} alt={this.props.title} />
      </div>
    );
  }

}

Gallery.propTypes = {

};

Gallery.defaultProps = {

};

export default Gallery;
