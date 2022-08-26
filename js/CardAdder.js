import React, {useContext} from 'react';
import AppContext from "./AppContext";

const CardAdder = () => {
    const {handleCreateCard} = useContext(AppContext);

    const handleOnAdd = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const cardName = formData.get('inputName')
        handleCreateCard(cardName);
        e.target.reset()
    }

    return (
        <form className={'card_adder'} onSubmit={handleOnAdd}>
            <input type='text' name='inputName' autoComplete='off' placeholder='Enter card name'/>
            <button type='submit'>Add to the next epidemic</button>
        </form>
    )
}

export default CardAdder;