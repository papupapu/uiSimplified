import React from 'react';
import { Link } from 'react-router-dom';

function SEOTag({ tag, value, className, url }) {
  if (value !== '') {
    const headingContent = url !== '' ? <Link to={url}>{value}</Link> : value;
    if (className !== '') {
      switch (tag) {
        case 'h1':
          return (
            <h1 className={className}>{headingContent}</h1>
          );
        case 'h2':
          return (
            <h2 className={className}>{headingContent}</h2>
          );
        case 'h3':
          return (
            <h3 className={className}>{headingContent}</h3>
          );
        case 'h4':
          return (
            <h4 className={className}>{headingContent}</h4>
          );
        case 'h5':
          return (
            <h5 className={className}>{headingContent}</h5>
          );
        case 'h6':
          return (
            <h6 className={className}>{headingContent}</h6>
          );
        default:
          return (
            <p className={className}>{headingContent}</p>
          );
      }
    } else {
      switch (tag) {
        case 'h1':
          return (
            <h1>{headingContent}</h1>
          );
        case 'h2':
          return (
            <h2>{headingContent}</h2>
          );
        case 'h3':
          return (
            <h3>{headingContent}</h3>
          );
        case 'h4':
          return (
            <h4>{headingContent}</h4>
          );
        case 'h5':
          return (
            <h5>{headingContent}</h5>
          );
        case 'h6':
          return (
            <h6>{headingContent}</h6>
          );
        default:
          return (
            <p>{headingContent}</p>
          );
      }
    }
  }
}

SEOTag.propTypes = {
  tag: React.PropTypes.string,
  value: React.PropTypes.string,
  className: React.PropTypes.string,
  url: React.PropTypes.string,
};

SEOTag.defaultProps = {
  tag: '',
  value: '',
  className: '',
  url: '',
};

export default SEOTag;
