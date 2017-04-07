import React from 'react';

import './Hamburger.css';

function Hamburger() {
  const x = 'M 0 11 L 24 11 L 24 13 L 0 13 L 0 11 Z M 0 11';
  const y = 'M 0 11 L 24 11 L 24 13 L 0 13 L 0 11 Z M 0 11';
  const a = 'M 0 19 L 24 19 L 24 21 L 0 21 L 0 19 Z M 0 19';
  const b = 'M 0 3 L 24 3 L 24 5 L 0 5 L 0 3 Z M 0 3';
  return (
    <svg className="hamburger" height="24" width="24" viewBox="0 0 24 24">
      <path className="x" fill="#F6A623" fillRule="evenodd" d={x} />
      <path className="y" fill="#F6A623" fillRule="evenodd" d={y} />
      <path className="a" fill="#F6A623" fillRule="evenodd" d={a} />
      <path className="b" fill="#F6A623" fillRule="evenodd" d={b} />
    </svg>
  );
}

export default Hamburger;
