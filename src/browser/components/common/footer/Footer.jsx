import React from 'react';
import { FOOTER_QUOTE } from '../../../../server/configurations/Default';
import './Footer.css';

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="sw">
        <p>{FOOTER_QUOTE}</p>
        <div className="logo" />
      </div>
    </footer>
  );
}

Footer.propTypes = {};
Footer.defaultProps = {};

export default Footer;
