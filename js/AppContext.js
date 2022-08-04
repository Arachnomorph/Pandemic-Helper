import React, {createContext, useCallback, useEffect, useMemo, useState} from "react";

const AppContext = createContext(null);

function AppContextProvider({children}) {
    const [cards, setCards] = useState([]);

    const clearAll = useCallback(() => {
        setCards([]);
    }, [cards])

    const handleCreateCard = useCallback(val => {
        if (!val) {
            return
        }
        const card = {
            id: cards.length,
            description: val,
            discarded: true,
            stack: 0
        }
        setCards(prev => prev.concat(card))
    }, [cards])

    const isShuffled = useCallback(() => {
        return cards.some(el => !el.discarded);
    }, [cards])

    const handleShuffle = useCallback(() => {
        if (isShuffled) {
            setCards(prev => prev.map(card => {
                if (card.discarded) {
                    return {...card, stack: card.stack, discarded: false}
                } else {
                    return {...card, stack: card.stack + 1, discarded: false}
                }
            }))
        } else {
            setCards(prev => prev.map(card => ({...card, discarded: false})))
        }
    }, [cards, isShuffled])

    const handleDiscard = useCallback((e) => {
        const id = parseInt(e.target.id);
        setCards(prev => prev.map(card => {
            if (card.id !== id) {
                return {...card}
            }
            return {...card, discarded: true, stack: 0}
        }))
    }, [cards])

    const value = useMemo(() => {
        return {
            clearAll,
            cards,
            setCards,
            handleCreateCard,
            handleShuffle,
            handleDiscard
        }
    }, [cards, handleCreateCard()])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContextProvider};
export default AppContext;