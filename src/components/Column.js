import React from "react";
import Card from "./Card";

/**
 * Render a column of cards with a title
 * @param {*} param0 
 */
const Column = ({title, cards, color, onAddNew, onMove, columnIndex, onDelete}) => {
    return <div className="column">
        <p className="title" style={{backgroundColor: color}}>{title}</p>
        <div className="cards">
            {cards.map((card, index) => {
                if (card === null) return;
                return <Card 
                    content={card || ""} 
                    onMove={onMove} 
                    cardIndex={index} 
                    first={columnIndex === 0}
                    last={columnIndex === cards.length+1}
                    onDelete={() => onDelete(columnIndex, index)}
                />
            })}
        </div>
        <button onClick={onAddNew}>Add New</button>
    </div>
}

export default Column;