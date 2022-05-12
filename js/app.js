import React from "react";
import ReactDOM from 'react-dom';
import CardAdder from "./CardAdder";
import Piles from "./Piles";
import {AppContextProvider} from "./AppContext";

const App = () => {

    return (
        <AppContextProvider>
            <CardAdder/>
            <Piles/>
        </AppContextProvider>
    )
}

ReactDOM.render(
    <App/>,
    document.querySelector('#app')
)