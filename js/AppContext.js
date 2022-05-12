import React, {createContext, useCallback, useEffect, useMemo, useState} from "react";

const AppContext = createContext(null);
const api_url = 'http://localhost:3000/cards/';

function AppContextProvider({children}) {
    const [cards, setCards] = useState([]);

    const dbClear = useCallback(() => {
        cards.forEach(card => {
            fetch(api_url + (card.id), {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            })
                .then(resp => {
                    if (resp.ok) {
                        return resp.json()
                    }
                    throw new Error('response code = bad')
                })
                .then(() => {
                    setCards([]);
                })
                .catch(err => console.error(err))
        })
    }, [cards])

    useEffect(() => {
        dbUpdate();
    }, [])

    const dbUpdate = useCallback(() => {
        fetch(api_url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
                throw new Error('response code = bad')
            })
            .then(data => {
                setCards(data);
            })
            .catch(err => console.error(err))
    }, [cards])

    const dbAdd = useCallback((data) => {
        fetch(api_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
                throw new Error('response code = bad')
            })
            .then(data => {
                setCards((prev) => prev.concat(data))
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const handleCardAdder = useCallback((val) => {
        if (!val.length) {
            return
        }
        dbAdd({
            description: val,
            discarded: true,
            stack: 1
        });
        // dbUpdate();
    }, [dbAdd])

    const isShuffled = useCallback(() => {
        return cards.some(el => !el.discarded);
    }, [cards])

    const handleShuffle = useCallback(() => {
        if (isShuffled) {
            setCards(prev => prev.map(card => {
                if (card.discarded) {
                    return {...card, stack: 1, discarded: false}
                } else {
                    return {...card, stack: 2, discarded: false}
                }
            }))
        } else {
            setCards(prev => prev.map(card => ({...card, discarded: false})))
        }
    }, [cards, dbAdd, isShuffled])

    const handleDiscard = useCallback((e) => {
        const id = parseInt(e.target.id);
        setCards(prev => prev.map(card => {
            if (card.id !== id) {
                return card
            }
            return {...card, discarded: true}
        }))
    }, [dbAdd])

    const value = useMemo(() => {
        return {
            dbClear,
            cards,
            setCards,
            handleCardAdder,
            handleShuffle,
            handleDiscard
        }
    }, [cards, handleCardAdder])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContextProvider};
export default AppContext;