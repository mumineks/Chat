import React, {useState} from 'react'


function Chat(props){

   const [quote, setQuote] = useState('');
   const handleChange = (evt) => setQuote(evt.target.value)
   const handleSubmit = (evt)=> {evt.preventDefault()
    props.newQuote([...oldQuotes, quote]) 
    setQuote('')}
    let oldQuotes  = [...Array.from(props.quotes)];
        return(
            <div>
                <ul>
        {oldQuotes.map(q => <li>{props.name} mowi {q}</li>)}
                </ul>
                <form onSubmit ={handleSubmit}>         
                    <input type='text'value = {quote} onChange = {handleChange} />
                    
                    <button>Go</button>
                </form>               
            </div>
        )
}

export default Chat
