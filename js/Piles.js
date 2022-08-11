import React, {useContext} from "react";
import AppContext from "./AppContext";

function Piles() {
    const {clearAll, cards, handleShuffle, handleDiscard, handleInfect} = useContext(AppContext);

    return (
        <div style={{display: 'flex'}}>
            <div style={{border: '2px solid red'}}>
                <p>Infection Pile</p>
                <ul>{cards.filter(card => !card.discarded).sort((a, b) => {
                    return (a.stack - b.stack)
                }).map(card => <li style={{cursor: 'pointer'}} onClick={handleDiscard} id={card.id} key={card.id}>
                    {card.stack} {card.description}
                    <button onClick={handleDiscard} id={card.id}>MOV</button>
                </li>)}
                </ul>
            </div>
            <div style={{border: '2px solid green'}}>
                <p>Discarded Pile</p>
                <ul>{cards.filter(card => card.discarded).map(card => <li id={card.id} key={card.id}>
                    {card.description}
                    <button onClick={handleInfect} id={card.id}>MOV</button>
                </li>)}
                </ul>
                <button onClick={handleShuffle}>Shuffle</button>
            </div>
            <button onClick={clearAll}>Clear all</button>
        </div>
    )
}

export default Piles;