import React, {useContext} from "react";
import AppContext from "./AppContext";

function Piles() {
    const {clearAll, cards, handleShuffle, handleDiscard, handleInfect, handleDestroy} = useContext(AppContext);

    return (
        <div className={'main_container'}>
            <div className={'pile shuffled_pile'}>
                <p>Infection Pile</p>
                <ul>{cards.filter(card => card.description !== 'DELETED').filter(card => !card.discarded).sort((a, b) => {
                    return (a.stack - b.stack)
                }).map(card => <li className={`card_name stack_${card.stack}`} onClick={handleDiscard} id={card.id} key={card.id}>
                    {card.description}
                    <div className={'buttons'}>
                        <button onClick={handleDiscard} id={card.id}>Discard</button>
                        <button className={'destroy_button'} onClick={handleDestroy} id={card.id}> </button>
                    </div>
                </li>)}
                </ul>
            </div>
            <div className={'pile discarded_pile'}>
                <p>Discarded Pile</p>
                <ul>{cards.filter(card => card.description !== 'DELETED').filter(card => card.discarded).map(card => <li
                    className={`card_name`} id={card.id} key={card.id}>
                    {card.description}
                    <div className={'buttons'}>
                        <button onClick={handleInfect} id={card.id}>Shuffle</button>
                        <button className={'destroy_button'} onClick={handleDestroy} id={card.id}> </button>
                    </div>
                </li>)}
                </ul>
            </div>
            <button onClick={handleShuffle}>Shuffle All</button>
            <button onClick={clearAll}>Clear all</button>
        </div>
    )
}

export default Piles;