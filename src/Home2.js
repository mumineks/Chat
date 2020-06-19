import React, {useContext } from 'react';
import { ACTION_TYPES, ReduxContext} from './reducer';

function Home(props) {
	const { state, dispatch } = useContext(ReduxContext);
	const handleSubmit = (evt) => {
		evt.preventDefault();
		props.history.push('/chat');
	};
	const handleOnChange = (evt) => {
		console.log(state.name);
		dispatch({ type: ACTION_TYPES.USERNAMECHANGE, payload: evt.target.value });
	};
	return (
		<div className="box">
			<form onSubmit={handleSubmit}>
				<label htmlFor="userName">Name:</label>
				<input name="userName" type="text" value={state.name} onChange={handleOnChange} />
				<button> Send</button>
			</form>
		</div>
	);
}

export default Home;

