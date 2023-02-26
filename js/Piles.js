import React, { useContext } from "react";
import AppContext from "./AppContext";
import Card from "./Card";

function Piles() {
  const { cards } = useContext(AppContext);

  const cardsInPlay = cards.filter((card) => card.description !== "DELETED");

  const shuffledCards = cardsInPlay
    .filter((card) => !card.discarded)
    .sort((a, b) => {
      return a.stack - b.stack;
    })
    .reduce((acc, card) => {
      const key = card.stack;
      acc[key] = acc[key] || [];
      acc[key].push(card);
      return acc;
    }, []);

  const discardedCards = cardsInPlay.filter((card) => card.discarded);

  return (
    <div className={"main-container"}>
      <div className={"pile shuffled_pile"}>
        {shuffledCards.map((group, stack) => (
          <ul className={`stack`} key={stack}>
            {group.map((card) => (
              <Card card={card} key={card.id} />
            ))}
          </ul>
        ))}
      </div>
      <div className={"pile discarded_pile"}>
        <ul>
          {discardedCards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Piles;
