import React, { useContext } from "react";
import AppContext from "./AppContext";
import PropTypes from "prop-types";

function Card({ card }) {
  const { handleSwitchPiles, handleDestroy } = useContext(AppContext);

  const handleOnInfect = (e) => {
    e.stopPropagation();
    handleSwitchPiles(card.id);
  };

  const handleOnDestroy = (e) => {
    e.stopPropagation();
    handleDestroy(card.id);
  };

  return (
    <li
      className={`card-name`}
      onClick={handleOnInfect}
      id={card.id}
      key={card.id}
    >
      <div className={"buttons"}>
        <button className={"button-middle"} onClick={handleOnInfect}>
          <span className={"info"}>
            {card.discarded ? "Intensify" : "Infect"}
          </span>
          <span className={"material-symbols-outlined icon"}>
            {card.discarded ? "flip_to_back" : "flip_to_front"}
          </span>
        </button>
        <button className={"button-right-edge"} onClick={handleOnDestroy}>
          <span className={"info"}>Remove from play</span>
          <span className={"material-symbols-outlined icon"}>
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
};

export default Card;
