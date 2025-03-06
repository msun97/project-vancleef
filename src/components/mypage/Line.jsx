import React from 'react';

const Line = ({ width = '708px', height = '1px', color = 'black', marginTop = '13px' }) => {
  return (
    <div style={{ marginTop }}>
      <div style={{ width, height, backgroundColor: color }} />
    </div>
  );
};

export default Line;