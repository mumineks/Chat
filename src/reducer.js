import React, { useReducer, createContext, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export const ACTION_TYPES = {
	USER_NAME_CHANGE: 'USER_NAME_CHANGE',
	TYPE_QUOTE: 'TYPE_QUOTE',
	CHANGE_QUOTES: 'CHANGE_QUOTES',
	REMOVE_QUOTE: 'REMOVE_QUOTE',
	TOGGLE_EDITING: 'TOGGLE_EDITING',
	UPDATE: 'UPDATE',
	UPDATE_TYPING: 'UPDATE_TYPING',
	SET_DATE: 'SET_DATE'
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'USER_NAME_CHANGE':
			return { ...state, name: action.payload };
		case 'TYPE_QUOTE':
			return { ...state, quote: action.payload };
		case 'CHANGE_QUOTES':
			return {
				...state,
				quotes: [
					...state.quotes,
					{ content: state.quote, id: uuid(), isEditable: false, date: action.date, isEdited: false }
				],
				quote: ' '
			};
		case 'REMOVE_QUOTE':
			return { ...state, quotes: state.quotes.filter((q) => q.id !== action.id) };
		case 'TOGGLE_EDITING':
			return {
				...state,
				quotes: state.quotes.map((q) => (q.id === action.id ? { ...q, isEditable: !q.isEditable } : q))
			};
		case 'UPDATE':
			return {
				...state,
				quotes: state.quotes.map((q) => (q.id === action.id ? { ...q, isEditable: false, isEdited: true } : q))
			};
		case 'UPDATE_TYPING':
			return {
				...state,
				quotes: state.quotes.map((q) => (q.id === action.id ? { ...q, content: action.payload } : q))
			};
		default:
			return state;
	}
};

export const defaultState = {
	name: '',
	quotes: [],
	quote: ''
};

export const ReduxContext = createContext();

export const ReduxProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(reducer, defaultState, () => {
		const localData = localStorage.getItem('stateName');
		return localData ? { ...defaultState, name: JSON.parse(localData) } : defaultState;
	});
	useEffect(() => {
		localStorage.setItem('stateName', JSON.stringify(state.name));
	});
	return <ReduxContext.Provider value={{ state, dispatch }}>{children}</ReduxContext.Provider>;
};
