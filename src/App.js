import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './Home2';
import Chat from './Chat2';
import { ReduxProvider } from './reducer';

function App() {
	return (
		<div className="body-styling">
			<Route exact path="/" render={(routeProps) => <Home {...routeProps} />} />
			<Route exact path="/chat" render={() => <Chat />} />
		</div>
	);
}

const ReduxApp = () => (
	<ReduxProvider>
		<App />
	</ReduxProvider>
);

export default ReduxApp;
