import React, {useState} from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Home from './Home'
import Chat from './Chat'
//import { css, jsx } from '@emotion/core'



function App() {
  
 const [name, setName] = useState('imię');
  const [quotes, setQuotes] = useState([])
      return(
          <div>
            {console.log(quotes)}
             <Route exact path ='/' render = { (routeProps) => <Home name = {name} setName = {setName} {...routeProps}/> }  />
              <Route exact path ='/chat' render = {() => <Chat name = {name} quotes = {quotes} newQuote = {setQuotes}/>}/>
          </div>
      )
}


export default App;
