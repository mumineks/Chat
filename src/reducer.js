import React , { useReducer, createContext } from "react" ;
import { render } from "react-dom" ;
import uuid from 'uuid/v4';


export const ACTION_TYPES ={
    USERNAMECHANGE : 'USERNAMECHANGE',
    TYPEQUOTE : 'TYPEQUOTE',
    CHANGEQUOTES : 'CHANGEQUOTES'
}

export const reducer = (state, action) =>{
    switch(action.type){
        case 'USERNAMECHANGE':
            return {...state, name:  action.payload};
        case 'TYPEQUOTE':
            return {...state, quote : action.payload};
        case 'CHANGEQUOTES':
            return {...state, quotes : [...state.quotes, {content: state.quote, id: uuid()}], quote: ' '};
        default:
            return state
    }
};

export const defaultState = {
    name: 'imię',
    quotes: [{content: 'tak', id: uuid()}, {content: 'nie', id: uuid()}],
    quote: ''
};

/*export const useActions = (state, dispatch) =>{
    return{
        userNameChange: () => dispatch({type: ACTION_TYPES.USERNAMECHANGE }),
        typeQuote: () => dispatch({type: ACTION_TYPES.TYPEQUOTE }),
        changeQuotes: () => dispatch({type: ACTION_TYPES.CHANGEQUOTES })
    }
}*/

export const ReduxContext = createContext ();

export const ReduxProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer , defaultState);
    //const actions = useActions(state, dispatch);
    return (
    <ReduxContext.Provider value= {{ state, dispatch}} >
    {children}
    </ReduxContext.Provider >
    );
};