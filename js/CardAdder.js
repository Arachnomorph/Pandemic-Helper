import React, { useContext } from "react";
import AppContext from "./AppContext";

const CardAdder = () => {
  const { handleCreateCard, clearAll, handleShuffle } = useContext(AppContext);

  const handleOnAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cardName = formData.get("inputName");
    handleCreateCard(cardName);
    e.target.reset();
  };

  return (
    <div className={"adder-container"}>
      <form className={"card-adder"} onSubmit={handleOnAdd}>
        <input
          type="text"
          name="inputName"
          autoComplete="do-not-autofill"
          placeholder="Enter city name"
        />
        <button type="submit" className={"button-right-edge"}>
          <span className={"info"}>Infect</span>
          <span className={"material-symbols-outlined icon"}>add</span>
        </button>
      </form>
      <div className={"big-buttons"}>
        <button className={"big-button button-left-edge"} onClick={handleShuffle}>
          <span className={"info"}>Intensify</span>
          <span className={"material-symbols-outlined icon"}>shuffle</span>
        </button>
        <button className={"big-button button-right-edge"} onClick={clearAll}>
          <span className={"info"}>Delete all data</span>
          <span className={"material-symbols-outlined icon"}>refresh</span>
        </button>
      </div>
    </div>
  );
};

export default CardAdder;
