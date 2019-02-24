import React from 'react';

const BoardHead = props => {
  let minutes = Math.floor(props.time / 60);
  let seconds = props.time - minutes * 60 || 0;
  let formattedTime = seconds < 10 ?  `0${seconds}` : seconds;
  let time = `${minutes}: ${formattedTime}`;

  return (
    <div className="boardhead">
     
      <div className="flag">Flag Count: {props.flagCount}</div>
      <button className="reset">Reset</button>
      <div className="time">Time: {time}</div>
    </div>
  );
};

export default BoardHead;