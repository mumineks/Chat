import React, {useContext} from 'react'
import {ChatContext} from './ChatContext';


function Chat(props){

   const {name, quotes, quote, addQuote, changeQuote, clearField} = useContext(ChatContext);
   const handleInputChange = evt => changeQuote(evt.target.value)
   const handleSubmit = evt =>{
       evt.preventDefault();
       addQuote()
       changeQuote('')
   }

   const handleOnClick = () => changeQuote('')

   let oldQuotes  = [...Array.from(quotes)];
    
        return(
            <div>
                <ul>
        {oldQuotes.map(q => <li>{name} mowi {q}</li>)}
                </ul>
                <form onSubmit ={handleSubmit}>         
                    <input type='text' value = {quote} onChange = {handleInputChange}/>
                    
                    <button>Go</button>
                </form>               
            </div>
        )
}

export default Chat
