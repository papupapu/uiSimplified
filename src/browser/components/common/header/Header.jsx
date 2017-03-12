import React from 'react';
import './Header.css';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.scrollPosition = 0;
    this.scrollDirection = null;

    this.toggleSiteNavigation = this.toggleSiteNavigation.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  handleScroll() {
    const scrollPosition = document.body.scrollTop;
    this.scrollDirection = scrollPosition > this.scrollPosition ? 'down' : 'up';
    this.scrollPosition = scrollPosition;
    if (this.scrollDirection === 'up') {
      if (this.scrollPosition > 0) {
        this.header.className = 'fixed';
      } else {
        this.header.className = '';
      }
    } else if (this.scrollPosition > 50) {
      this.header.className = 'lurking';
    } else {
      this.header.className = '';
    }
  }

  toggleSiteNavigation(event) {
    event.preventDefault();
    this.props.toggleSiteNavigation();
  }

  render() {
    const x = 'M 0 11 L 24 11 L 24 13 L 0 13 L 0 11 Z M 0 11';
    const y = 'M 0 11 L 24 11 L 24 13 L 0 13 L 0 11 Z M 0 11';
    const a = 'M 0 19 L 24 19 L 24 21 L 0 21 L 0 19 Z M 0 19';
    const b = 'M 0 3 L 24 3 L 24 5 L 0 5 L 0 3 Z M 0 3';
    return (
      <header id="header" ref={(header) => { this.header = header; }}>
        <div className="header">
          <div className="sw">
            <h1 className="logo">logo</h1>
            <a className="menu_handle" href="" onClick={this.toggleSiteNavigation}>
              <svg height="24" width="24" viewBox="0 0 24 24">
                <path className="x" fill="#F6A623" fillRule="evenodd" d={x} />
                <path className="y" fill="#F6A623" fillRule="evenodd" d={y} />
                <path className="a" fill="#F6A623" fillRule="evenodd" d={a} />
                <path className="b" fill="#F6A623" fillRule="evenodd" d={b} />
              </svg>
            </a>
          </div>
        </div>
        <nav id="nav">
          <dl>
            <dd><a className="hp" href="">Home</a></dd>
            <dt>Categorie</dt>
            <dd><a href="">Categoria</a></dd>
            <dd><a href="">Categoria</a></dd>
            <dd><a href="">Categoria</a></dd>
            <dd><a href="">Categoria</a></dd>
            <dd><a href="">Categoria</a></dd>
            <dd><a href="">Categoria</a></dd>
            <dt>Servizi</dt>
            <dd><a href="">Categoria</a></dd>
            <dd><a href="">Categoria</a></dd>
            <dd><a href="">Categoria</a></dd>
          </dl>
        </nav>
      </header>
    );
  }

}

Header.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  toggleSiteNavigation: React.PropTypes.func,
};

Header.defaultProps = {
  device: '',
  viewport: {},
  toggleSiteNavigation: null,
};

export default Header;
