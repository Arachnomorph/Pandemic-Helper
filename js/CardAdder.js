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
    <div className={"adder_container"}>
      <form className={"card_adder"} onSubmit={handleOnAdd}>
        <input
          type="text"
          name="inputName"
          autoComplete="do-not-autofill"
          placeholder="Enter card name"
        />
        <button type="submit">
          <span className={"material-symbols-outlined"}>add</span>
        </button>
      </form>
      <button>
        <span onClick={handleShuffle} className={"material-symbols-outlined"}>
          shuffle
        </span>
      </button>
      <button onClick={clearAll}>Clear All</button>
    </div>
  );
};

export default CardAdder;
