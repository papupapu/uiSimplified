import React from 'react';
import './Gallery.css';

class Gallery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="gallery" ref={(gallery) => { this.gallery = gallery; }}>
        gallery
      </div>
    );
  }

}

Gallery.propTypes = {

};

Gallery.defaultProps = {

};

export default Gallery;
