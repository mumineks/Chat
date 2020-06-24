import React, { useContext } from 'react';
import { ACTION_TYPES, ReduxContext } from './reducer';

function Home(props) {
	const { state, dispatch } = useContext(ReduxContext);
	const handleSubmit = (evt) => {
		evt.preventDefault();
		if (state.name) {
			props.history.push('/chat');
		}
	};
	const handleOnChange = (evt) => {
		dispatch({ type: ACTION_TYPES.USER_NAME_CHANGE, payload: evt.target.value });
	};
	return (
		<div className="container">
			<div className="row">
				<div className="boxHome col-md-6 offset-md-3 col-sm-12 col-12">
					<div className="row h-100 justify-content-center align-items-center">
						<form onSubmit={handleSubmit} className="form-group">
							<label htmlFor="userName">Name:</label>
							<input
								name="userName"
								type="text"
								placeholder="wprowadź imię użytkownika"
								value={state.name}
								onChange={handleOnChange}
							/>
							<div className="buttonCentered">
								<button className="buttonHome"> Send</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
