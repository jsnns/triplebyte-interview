import React, { Component } from 'react';
import logo from './assets/logo.svg';
import Column from './components/Column';
import { ColumnColors } from './constants/Colors';
import { throwStatement } from '@babel/types';

class App extends Component {
  state = {
    columns: {
      "Winnie": [],
      "Bob": [],
      "Thomas": [],
      "George": []
    }
  }

  render() {
    return (
      <div className="board">
        {Object.keys(this.state.columns).map((columnId, index) => {
          const cards = this.state.columns[columnId];
          return <Column 
            title={columnId} 
            cards={cards} 
            color={ColumnColors[index]} 
            onAddNew={this.addCard(columnId)}
            onMove={this.moveCard(columnId)}
            columnIndex={index}
            onDelete={this.deleteCard}
          />
        })}
      </div>
    );
  }

  componentWillMount() {
    const previousState = JSON.parse(window.localStorage.getItem("columnState"))
    if (previousState && previousState.hasOwnProperty("columns")) {
      this.setState(previousState)
    } else {
      const columns = this.state.columns;
      this.setState({columns})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // lodash deep compare
    window.localStorage.setItem("columnState", JSON.stringify(this.state));
  }
  

  addCard = (columnId) => {
    return () => {
      const cardContent = window.prompt("Card content: ");
      const columns = this.state.columns;
      columns[columnId].push(cardContent)
      
      if (cardContent !== "" && cardContent != null) {
        this.setState({columns})
      } else {
        console.warn("User entered a blank body, not adding card.")
      }
    }
  }

  moveCard = fromColumn => {
    return (direction, cardIndex) => {
      const toColumnId = this.findColumnId(fromColumn, direction);
  
      const columns = this.state.columns;
      const cardText = columns[fromColumn][cardIndex]
  
      columns[toColumnId].push(cardText)
      delete columns[fromColumn][cardIndex];
  
      this.setState({ columns });
    }
  }

  findColumnId = (fromColumn, direction) => {
    const columnIds = Object.keys(this.state.columns);
    const columnIndex = columnIds.indexOf(fromColumn);

    if (direction === "left") {
      if (columnIndex === 0) return 0
      else return columnIds[columnIndex - 1];
    }
    else if (direction === "right") {
      if (columnIndex === columnIds.length-1) return columnIds.length-1;
      else return columnIds[columnIndex + 1];
    }
  }

  deleteCard = (columnIndex, cardIndex) => {
    const columns = this.state.columns;
    const columnIds = Object.keys(this.state.columns);

    delete columns[columnIds[columnIndex]][cardIndex];

    this.setState({columns})
  }
}

export default App;
