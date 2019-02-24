import React from 'react';
import Cell from '../Cell';

const Row = props => {
  let cells = props.cells.map((info, i) => {
    return (
      <Cell 
        key={i} 
        data={info}
        open={props.open}
      />
    )
  })
  return (
    <div className='row'>
      {cells}
    </div>
  );
};

export default Row;