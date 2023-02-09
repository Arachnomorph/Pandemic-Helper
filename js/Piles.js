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
                <div className={"buttons"}>
                  <button
                    className={"button-middle"}
                    id={card.id}
                    onClick={handleInfect}
                  >
                    <span className={"info"} id={card.id}>
                      Infect
                    </span>
                    <span
                      className={"material-symbols-outlined icon"}
                      id={card.id}
                    >
                      flip_to_front
                    </span>
                  </button>
                  <button
                    className={"button-right-edge"}
                    id={card.id}
                    onClick={handleDestroy}
                  >
                    <span className={"info"} id={card.id}>
                      Remove from play
                    </span>
                    <span
                      className={"material-symbols-outlined icon"}
                      id={card.id}
                    >
                      delete_forever
                    </span>
                  </button>
                </div>
                <p className={"test"}>{card.description}</p>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className={"pile discarded_pile"}>
        <ul>
          {discardedCards.map((card) => (
            <li className={"card_name"} id={card.id} key={card.id}>
              <div className={"buttons"}>
                <button
                  className={"button-middle"}
                  id={card.id}
                  onClick={handleInfect}
                >
                  <span className={"info"} id={card.id}>
                    Intensify
                  </span>
                  <span
                    className={"material-symbols-outlined icon"}
                    id={card.id}
                  >
                    flip_to_back
                  </span>
                </button>
                <button
                  className={"button-right-edge"}
                  id={card.id}
                  onClick={handleDestroy}
                >
                  <span className={"info"} id={card.id}>
                    Remove from play
                  </span>
                  <span
                    className={"material-symbols-outlined icon"}
                    id={card.id}
                  >
                    delete_forever
                  </span>
                </button>
              </div>
              <p className={"test"}>{card.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Piles;
