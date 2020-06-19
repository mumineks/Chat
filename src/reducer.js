import React, { useReducer, createContext } from 'react';
import uuid from 'uuid/v4';

export const ACTION_TYPES = {
	USERNAMECHANGE: 'USERNAMECHANGE',
	TYPEQUOTE: 'TYPEQUOTE',
	CHANGEQUOTES: 'CHANGEQUOTES',
	REMOVEQUOTE: 'REMOVEQUOTE',
	TOGGLEEDITING: 'TOGGLEEDITING',
	UPDATE: 'UPDATE',
	UPDATETYPING: 'UPDATETYPING',
	SETDATE: 'SETDATE'
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'USERNAMECHANGE':
			return { ...state, name: action.payload };
		case 'TYPEQUOTE':
			return { ...state, quote: action.payload };
		case 'CHANGEQUOTES':
			return {
				...state,
				quotes: [
					...state.quotes,
					{ content: state.quote, id: uuid(), isEditable: false, date: action.date, isEdited: false }
				],
				quote: ' '
			};
		case 'REMOVEQUOTE':
			return { ...state, quotes: state.quotes.filter((q) => q.id !== action.id) };
		case 'TOGGLEEDITING':
			return {
				...state,
				quotes: state.quotes.map((q) => (q.id === action.id ? { ...q, isEditable: !q.isEditable } : q))
			};
		case 'UPDATE':
			return {
				...state,
				quotes: state.quotes.map((q) => (q.id === action.id ? { ...q, isEditable: false, isEdited: true } : q))
			};
		case 'UPDATETYPING':
			return {
				...state,
				quotes: state.quotes.map((q) => (q.id === action.id ? { ...q, content: action.payload } : q))
			};
		default:
			return state;
	}
};

export const defaultState = {
	name: 'imię',
	quotes: [],
	quote: ''
};

export const ReduxContext = createContext();

export const ReduxProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(reducer, defaultState);

	return <ReduxContext.Provider value={{ state, dispatch }}>{children}</ReduxContext.Provider>;
};
