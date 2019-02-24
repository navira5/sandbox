import React, { Component } from 'react';
import Row from '../Row';

class BoardGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.createBoard(props) 
    }
  }

  createBoard = props => {
    let board = [];

    for(let i = 0; i < props.rows; i++) {
      //create rows
      board.push([])
      for(let j = 0; j < props.columns; j++) {
        //create cell objects
        board[i].push({
          x: j,
          y: i,
          count: 0,
          isOpen: false,
          hasMine: false,
          hasFlag: false
        });
      }
    }
   
    //after create board, add mines
    for (let i = 0; i < props.mines; i++) {
      //put mine in random cell 
      let randomRow = Math.floor(Math.random() * props.rows);
      let randomCol = Math.floor(Math.random() * props.columns);
      let cell = board[randomRow][randomCol];
   
      //check for duplicate mine cells
      if (cell.hasMine) {
        i--;
      } else {
        cell.hasMine = true;
      }
      
    }

    return board;

  }

  minesInProximity = cell => {
    let minesNearby = 0;
    for(let row = -1; row <= 1; row++) {
      for(let col = -1; col <= 1; col++) {
        if(cell.y + row >= 0 && cell.x + col >= 0) {
          if(cell.y + row < this.state.rows.length && cell.x + col < this.state.rows[0].length) {
            if(this.state.rows[cell.y + row][cell.x + col].hasMine && !(row === 0 && col === 0)) {
              minesNearby++;
            }
          }
        }
      }
    }
    return minesNearby;
  }

  findAroundCell = cell => {
    let rows = this.state.rows;
    //check each cell and open until we find one with a mine; if mine - skip
    for(let row = -1; row <= 1; row++) {
      for(let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (cell.y + row < rows.length && cell.x + col < rows[0].length) {
            if(!rows[cell.y + row][cell.x + col].hasMine && !rows[cell.y + row][cell.x + col].isOpen) {
              this.open(rows[cell.y + row][cell.x + col]);
            }
          }
        }
      }
    }
  }
  

  open = cell => {
    //let asyncMineCount = new Promise(resolve => {
      let numberOfMines = this.minesInProximity(cell);
      //resolve(mines);
    //})

    //asyncMineCount.then(numberOfMines => {
      //console.log(numberOfMines, 'mines number')
      let rows = this.state.rows;
      let current = rows[cell.y][cell.x]



      if (current.hasMine && this.props.openCells === 0) {
        let newRows = this.createBoard(this.props);
        this.setState({
          rows: newRows
        }, () => {
          this.open(cell);
        })
      } else {
        //open if first cell doesn't have a flag
        if (!cell.hasFlag && !current.isOpen) {
          this.props.openCellClick();
          current.isOpen = true;
          current.count = numberOfMines;
          this.setState({ rows });
          
          if(!current.hasMine && numberOfMines === 0) {
            this.findAroundCell(cell);
          }

          
        }
        //flag
        //mine
      }
   // })
    //if cell is mine, you lose and display all mines
    //else you open cell 
      //if cell touching has mine, then show total number of mines
      //else cells touching will unhide and open all cells next to it and check for more info
  
    //if first click is mine, reset the board

    
  }

  render() {
    let rows = this.state.rows.map( (row, index) => {
      return (
        <Row 
          open={this.open}
          cells = {row}
          key={index}
        />
      )
    })

    return <div className='board'> {rows} </div>
    
    
  }
}

export default BoardGame;