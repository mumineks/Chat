import React, {useContext} from 'react'
import {ACTION_TYPES, reducer, defaultState, useActions, ReduxContext, ReduxProvider} from './reducer';

function Chat(props){

   const {state, dispatch} = useContext(ReduxContext);
   const handleInputChange = evt => {dispatch({type: ACTION_TYPES.TYPEQUOTE, payload: evt.target.value})
                             }
   const handleSubmit = evt =>{
       evt.preventDefault();
       dispatch({type: ACTION_TYPES.CHANGEQUOTES});
       console.log(state.quote)
   }



   let oldQuotes  = [...Array.from(state.quotes)];
    
        return(
            <div>
                <ul>
        {state.quotes.map(q => <li key={q.id}>{state.name} mowi {q.content}</li>)}
                </ul>
                <form onSubmit ={handleSubmit}>         
                    <input type='text' value = {state.quote.content} onChange = {handleInputChange}/>
                    <button>Go</button>
                </form>               
            </div>
        )
}

export default Chat
