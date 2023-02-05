import React, { useContext } from "react";
import AppContext from "./AppContext";

function Piles() {
  const { cards, handleDiscard, handleInfect, handleDestroy } =
    useContext(AppContext);

  const shuffledCards = cards
    .filter((card) => card.description !== "DELETED")
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

  const discardedCards = cards
    .filter((card) => card.description !== "DELETED")
    .filter((card) => card.discarded);

  return (
    <div className={"main_container"}>
      <div className={"pile shuffled_pile"}>
        {shuffledCards.map((group, stack) => (
          <ul className={`stack`} key={stack}>
            {group.map((card) => (
              <li
                className={`card_name`}
                onClick={handleDiscard}
                id={card.id}
                key={card.id}
              >
                {card.description}
                <div className={"buttons"}>
                  <button className={"discard_button"}>
                    <span
                      className={"material-symbols-outlined"}
                      onClick={handleDiscard}
                      id={card.id}
                    >
                      flip_to_front
                    </span>
                  </button>
                  <button className={"destroy_button"}>
                    <span
                      className={"material-symbols-outlined"}
                      onClick={handleDestroy}
                      id={card.id}
                    >
                      delete_forever
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className={"pile discarded_pile"}>
        <ul>
          {discardedCards.map((card) => (
            <li className={"card_name"} id={card.id} key={card.id}>
              {card.description}
              <div className={"buttons"}>
                <button className={"shuffle_button"}>
                  <span
                    className={"material-symbols-outlined"}
                    onClick={handleInfect}
                    id={card.id}
                  >
                    flip_to_back
                  </span>
                </button>
                <button className={"destroy_button"}>
                  <span
                    className={"material-symbols-outlined"}
                    onClick={handleDestroy}
                    id={card.id}
                  >
                    delete_forever
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Piles;
