import React from 'react';
import { LOGO, HAMBURGER } from '../../../../common/graphic/SVGCodes';
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
    this.props.toggleSiteNavigation(event);
  }

  render() {
    return (
      <header id="header" ref={(header) => { this.header = header; }}>
        <div className="header">
          <div className="sw">
            <h1 className="logo">
              <svg viewBox="0 0 67 31">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path d={LOGO.d} fill="#F6A623" />
                </g>
              </svg>
            </h1>
            <a className="menu_handle" href="" onClick={this.toggleSiteNavigation}>
              <svg height="24" width="24" viewBox="0 0 24 24">
                <path className="x" fill="#F6A623" fillRule="evenodd" d={HAMBURGER.x} />
                <path className="y" fill="#F6A623" fillRule="evenodd" d={HAMBURGER.y} />
                <path className="a" fill="#F6A623" fillRule="evenodd" d={HAMBURGER.a} />
                <path className="b" fill="#F6A623" fillRule="evenodd" d={HAMBURGER.b} />
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
  toggleSiteNavigation: React.PropTypes.func,
};

Header.defaultProps = {
  toggleSiteNavigation: null,
};

export default Header;
