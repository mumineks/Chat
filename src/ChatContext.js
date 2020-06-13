import React, {useState, createContext} from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Home from './Home'
import Chat from './Chat'
//import { css, jsx } from '@emotion/core'
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';

export const ChatContext = createContext();

export function ChatProvider(props) {
 /* 
const [name, setName] = useState('imię');
const [quotes, setQuotes] = useState([]);
const [quote, setQuote] = useState('');
const changeName = evt => setName(evt.target.value);
const addQuote = () => setQuotes([...quotes, quote]);
const clearField = () => setQuote('');
const changeQuote = val => setQuote(val);*/

         return(
            <ChatContext.Provider value = {{name, quotes, changeName, addQuote, changeQuote, clearField}}>
                {props.children}
            </ChatContext.Provider>
         );
   }

   