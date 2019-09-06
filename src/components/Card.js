import React from "react";

/**
 * Render a card
 * @param {card} param0 Object with body param
 */
const Card = ({content, onMove, cardIndex, first, last, onDelete}) => {
    return <div className="card">
        {!first && <button onClick={() => onMove("left", cardIndex)}>Left</button>}
        {content}
        <button onClick={onDelete}>Delete</button>
        {!last && <button onClick={() => onMove("right", cardIndex)}>Right</button>}
    </div>
}

export default Card;