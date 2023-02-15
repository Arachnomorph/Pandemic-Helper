import React, { useContext } from "react";
import AppContext from "./AppContext";
import PropTypes from "prop-types";

function Card({ card }) {
  const { handleDiscard, handleInfect, handleDestroy } = useContext(AppContext);
  console.log(card.description);

  return (
    <li
      className={`card_name`}
      onClick={handleDiscard}
      id={card.id}
      key={card.id}
    >
      <div className={"buttons"}>
        <button className={"button-middle"} id={card.id} onClick={handleInfect}>
          <span className={"info"} id={card.id}>
            Infect
          </span>
          <span className={"material-symbols-outlined icon"} id={card.id}>
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
          <span className={"material-symbols-outlined icon"} id={card.id}>
            delete_forever
          </span>
        </button>
      </div>
      <p className={"test"}>{card.description}</p>
    </li>
  );
}

Card.propTypes = {
  card: PropTypes.any,
}

export default Card;
