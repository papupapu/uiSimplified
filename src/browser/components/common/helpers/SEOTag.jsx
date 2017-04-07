import React from 'react';

function SEOTag({ tag, value, className }) {
  if (value !== '') {
    if (className !== '') {
      switch (tag) {
        case 'h1':
          return (
            <h1 className={className}>{value}</h1>
          );
        case 'h2':
          return (
            <h2 className={className}>{value}</h2>
          );
        case 'h3':
          return (
            <h3 className={className}>{value}</h3>
          );
        case 'h4':
          return (
            <h4 className={className}>{value}</h4>
          );
        case 'h5':
          return (
            <h5 className={className}>{value}</h5>
          );
        case 'h6':
          return (
            <h6 className={className}>{value}</h6>
          );
        default:
          return (
            <p className={className}>{value}</p>
          );
      }
    } else {
      switch (tag) {
        case 'h1':
          return (
            <h1>{value}</h1>
          );
        case 'h2':
          return (
            <h2>{value}</h2>
          );
        case 'h3':
          return (
            <h3>{value}</h3>
          );
        case 'h4':
          return (
            <h4>{value}</h4>
          );
        case 'h5':
          return (
            <h5>{value}</h5>
          );
        case 'h6':
          return (
            <h6>{value}</h6>
          );
        default:
          return (
            <p>{value}</p>
          );
      }
    }
  }
}

SEOTag.propTypes = {
  tag: React.PropTypes.string,
  value: React.PropTypes.string,
  className: React.PropTypes.string,
};

SEOTag.defaultProps = {
  tag: '',
  value: '',
  className: '',
};

export default SEOTag;
