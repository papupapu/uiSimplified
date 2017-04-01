import React from 'react';

function Overlayer({ action }) {
  return (
    <area
      href={null}
      className="overlayer"
      onClick={action}
      onTouchStart={action}
    />
  );
}

Overlayer.propTypes = {
  action: React.PropTypes.func,
};

Overlayer.defaultProps = {
  action: () => {},
};

export default Overlayer;
