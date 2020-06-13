import React, {useState, useReducer} from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Home from './Home2'
import Chat from './Chat2'
//import { css, jsx } from '@emotion/core'
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
//import { ChatProvider } from './ChatContext';
import {ACTION_TYPES, reducer, defaultState, useActions, ReduxContext, ReduxProvider} from './reducer';


/*const reducer = (state, action) =>{
    switch(action.type){
        case 'USERNAMECHANGE':
            return [...state, name: action.name];
        case 'CHANGEQUOTES':
            return [...quotes, quote: actionquote]
        case 'TYPEQUOTE':
            return [quote: action.quote]
        default:
            return state
    }
};

const defaultState = {
    name: 'imię',
    quotes: []
}

const store = createStore (reducer, defaultState);*/

function App() {
  
 /*const [name, setName] = useState('imię');
  const [quotes, setQuotes] = useState([])*/
      return(
        <div>
            <Route exact path ='/' render = { (routeProps) => <Home {...routeProps}/> }  />
            <Route exact path ='/chat' render = {() => <Chat/>}/>
        </div>
        
      )
}

const ReduxApp = () => (
    <ReduxProvider>
        <App/>
    </ReduxProvider>
    );

export default ReduxApp;


/*   <div>
            {console.log(quotes)}
             <Route exact path ='/' render = { (routeProps) => <Home name = {name} setName = {setName} {...routeProps}/> }  />
              <Route exact path ='/chat' render = {() => <Chat name = {name} quotes = {quotes} newQuote = {setQuotes}/>}/>
          </div>
          
*/

/*<ChatProvider>
<Route exact path ='/' render = { (routeProps) => <Home {...routeProps}/> }  />
<Route exact path ='/chat' render = {() => <Chat/>}/>
</ChatProvider>     */