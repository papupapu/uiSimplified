import React from 'react';

class Image extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: true,
    };

    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    this.setState({ error: false });
  }

  render() {
    const img = this.state.error ?
      <img src={this.props.src} style={{ display: 'none' }} onLoad={this.handleLoad} className={this.props.class} alt={this.props.alt} />
    :
      <img src={this.props.src} className={this.props.class} alt={this.props.alt} />;

    return (
      <div className="media">
        {img}
      </div>
    );
  }

}

Image.propTypes = {
  src: React.PropTypes.string,
  class: React.PropTypes.string,
  alt: React.PropTypes.string,
};

Image.defaultProps = {
  src: '',
  class: '',
  alt: '',
};

export default Image;
