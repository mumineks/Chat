import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Chat from './Chat';
import Home from './Home';
import { ReduxProvider } from './reducer';

function App() {
	return (
		<div className="body-styling">
			<Route exact path="/" render={(routeProps) => <Home {...routeProps} />} />
			<Route exact path="/chat" render={(routeProps) => <Chat {...routeProps} />} />
		</div>
	);
}

const ReduxApp = () => (
	<ReduxProvider>
		<App />
	</ReduxProvider>
);

export default ReduxApp;
