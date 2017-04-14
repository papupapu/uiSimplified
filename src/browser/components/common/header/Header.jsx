import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from '../graphic/Logo';
import Hamburger from '../graphic/Hamburger';

import { categoryList } from '../../../../server/static/Categories';

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
    return true;
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
    if (event.target.className === 'menu_handle') {
      event.preventDefault();
    }
    this.props.toggleSiteNavigation(event);
  }

  linkList(data) {
    const list = [];
    data.forEach(
      (el) => {
        list.push(<dd key={`nav-el-${el.path}`}><NavLink onClick={this.toggleSiteNavigation} to={`/${el.path}`}>{el.label}</NavLink></dd>);
      },
    );
    return list;
  }

  render() {
    const categories = this.linkList(categoryList);
    return (
      <header id="header" ref={(header) => { this.header = header; }}>
        <div className="header">
          <div className="sw">
            <h1 className="logo"><Link to="/"><Logo /></Link></h1>
            <a className="menu_handle" href="" onClick={this.toggleSiteNavigation}>
              <Hamburger />
            </a>
          </div>
        </div>
        <nav id="nav">
          <dl>
            <dd className="hp">
              <NavLink exact onClick={this.toggleSiteNavigation} to="/">Home</NavLink>
            </dd>
            <dt>Categorie</dt>
            {categories}
            <dt>Servizi</dt>
            <dd>
              <NavLink onClick={this.toggleSiteNavigation} to="/gallery/5">Gallery</NavLink>
              <NavLink onClick={this.toggleSiteNavigation} to="/sicaadd">404</NavLink>
            </dd>
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

Header.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default Header;
