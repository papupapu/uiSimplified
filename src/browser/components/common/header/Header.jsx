import React from 'react';
import './Header.css';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <header id="header">aaa</header>
    );
  }

}

Header.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
};

Header.defaultProps = {
  device: '',
  viewport: {},
};

export default Header;
