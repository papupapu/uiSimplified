import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

class NotFound extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="notFound">
        <div>
          <p className="first">you might say we made a mistake...</p>
          <p className="second">but well... that&#39;s just like your opinion man...</p>
          <p className="third">
            go back to the <Link to="/">home page</Link>
          </p>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {};

NotFound.defaultProps = {};

export default NotFound;
