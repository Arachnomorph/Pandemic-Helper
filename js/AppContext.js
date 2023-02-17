import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";

const AppContext = createContext(null);

function AppContextProvider({ children }) {
  const [cards, setCards] = useState([]);
  const storageKey = "cards";

  useEffect(() => {
    if (localStorage.getItem(storageKey) === null) {
      setCards([]);
    } else {
      setCards(JSON.parse(localStorage.getItem(storageKey)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cards));
  }, [cards]);

  const clearAll = useCallback(() => {
    setCards([]);
    localStorage.setItem(storageKey, JSON.stringify([]));
  }, [cards]);

  const handleCreateCard = useCallback(
    (val) => {
      if (!val) return;
      const card = {
        id: cards.length,
        description: val,
        discarded: true,
        stack: 1,
      };
      setCards((prev) => prev.concat(card));
    },
    [cards]
  );

  const isShuffled = useCallback(() => {
    return cards.some((card) => !card.discarded);
  }, [cards]);

  const handleShuffle = useCallback(() => {
    if (isShuffled) {
      setCards((prev) =>
        prev.map((card) => {
          if (card.discarded) {
            return { ...card, stack: 1, discarded: false };
          } else {
            return { ...card, stack: card.stack + 1, discarded: false };
          }
        })
      );
    } else {
      setCards((prev) => prev.map((card) => ({ ...card, discarded: false })));
    }
  }, [cards, isShuffled]);

  const handleSwitchPiles = useCallback(
    (id) => {
      setCards((prev) =>
        prev.map((card) => {
          if (card.id !== id) {
            return { ...card };
          }
          return { ...card, discarded: !card.discarded };
        })
      );
    },
    [cards]
  );

  const handleIntensify = useCallback(
    (e) => {
      const id = parseInt(e.target.id);
      setCards((prev) =>
        prev.map((card) => {
          if (card.id !== id) {
            return { ...card };
          }
          return { ...card, discarded: false };
        })
      );
    },
    [cards]
  );

  const handleDestroy = useCallback(
    (e) => {
      const id = parseInt(e.target.id);
      setCards((prev) =>
        prev.map((card) => {
          if (card.id !== id) {
            return { ...card };
          }
          return { ...card, description: "DELETED" };
        })
      );
    },
    [cards]
  );

  const value = useMemo(() => {
    return {
      clearAll,
      cards,
      setCards,
      handleCreateCard,
      handleShuffle,
      handleSwitchPiles,
      handleIntensify,
      handleDestroy,
    };
  }, [cards, handleCreateCard()]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppContextProvider.propTypes = {
  children: PropTypes.any,
};

export { AppContextProvider };
export default AppContext;
