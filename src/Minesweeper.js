import React, { Component } from 'react';
import BoardGame from './components/BoardGame';
import BoardHead from './components/BoardHead';

class Minesweeper extends Component {
  constructor() {
    super();
    this.intervals = [];
  }
  
  state = {
    status: 'waiting', //waiting, running, ended
    openCells: 0,
    rows: 10,
    columns: 10,
    flags: 10,
    mines: 10,
    time:0,

  }

  tick = () => {
    if(this.state.openCells > 0 && this.state.status === 'running') {
      let time = this.state.time + 1;
      this.setState({ time })
    }
  }

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t))
  }

  handleCellClick = () => {
    console.log('hello from click')
    if(this.state.openCells === 0 && this.state.status !== 'running') {
      this.setState({
        status: 'running'
      }, () => {
        this.setInterval(this.tick, 1000);
      })
    }

    this.setState(prevState => {
      return { openCells: prevState.openCells + 1}
    })

    
  }

  render() {

    return (
      <div className='minesweeper'>
        <h1 className='title'>Minesweeper</h1>
        <BoardHead 
          flagCount={this.state.flags} 
          time={this.state.time}
          />
        <BoardGame 
          openCellClick={this.handleCellClick}
          rows={this.state.rows} 
          columns={this.state.columns}
          flags={this.state.flags}
          mines={this.state.mines} 
          openCells={this.state.openCells}/>
      </div>
    );
  }
}

export default Minesweeper;
