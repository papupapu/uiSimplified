import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../graphic/Logo';

import { FOOTER_QUOTE } from '../../../../server/configurations/Default';

import './Footer.css';

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="sw">
        <p>{FOOTER_QUOTE}</p>
        <div className="logo">
          <Link to="/"><Logo /></Link>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {};
Footer.defaultProps = {};

export default Footer;
