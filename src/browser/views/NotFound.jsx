import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

function NotFound() {
  return (
    <div className="notFound">
      <div>
        <p className="first">you might say we made a mistake...</p>
        <p className="second">but well... that's just like your opinion man...</p>
        <p className="third">
          go back to the <Link to="/">home page</Link>
        </p>
      </div>
    </div>
  );
}

NotFound.propTypes = {};

NotFound.defaultProps = {};

export default NotFound;
