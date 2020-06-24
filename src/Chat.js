import React, { useContext, useRef, useEffect } from 'react';
import { ACTION_TYPES, ReduxContext } from './reducer';
import * as io from 'socket.io-client';
import CurrDate from './CurrDate';
import CurrTime from './CurrTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUserEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { Scrollbar } from 'react-scrollbars-custom';

function Chat(props) {
	const { state, dispatch } = useContext(ReduxContext);
	const connectionRef = useRef(null);
	useEffect(
		() => {
			connectionRef.current = io.connect('https://chat-server.fbg.pl');

			connectionRef.current.on('chat message', (message) => {
				dispatch({
					type: ACTION_TYPES.CHANGE_QUOTES,
					payload: message
				});
			});
			return () => {
				// zamknij polaczenie
				// w celu unikniecia wyciekow pamieci
				connectionRef.current.close();
				connectionRef.current = null;
			};
		},
		[ dispatch ]
	);

	const handleInputChange = (evt) => {
		dispatch({ type: ACTION_TYPES.TYPE_QUOTE, payload: evt.target.value });
	};
	const handleSubmit = (evt) => {
		evt.preventDefault();
		dispatch({ type: ACTION_TYPES.CHANGE_QUOTES, date: CurrDate() });
		connectionRef.current.emit('Server works');
		connectionRef.current.emit('chat message', { authorId: state.name, quote: state.quote });
	};

	const handleOnClickRemove = (id) => {
		dispatch({ type: ACTION_TYPES.REMOVE_QUOTE, id });
	};

	const handleUpdateTyping = (id, evt) => {
		dispatch({ type: ACTION_TYPES.UPDATE_TYPING, payload: evt.target.value, id });
	};

	const handleOnClickUpdate = (id) => {
		dispatch({ type: ACTION_TYPES.TOGGLE_EDITING, id });
	};
	const handleUpdate = (id, evt) => {
		evt.preventDefault();
		dispatch({ type: ACTION_TYPES.UPDATE, payload: evt.target.value, id });
	};

	let oldQuotes = [ ...Array.from(state.quotes) ];

	return (
		<div className="container">
			<div className="row">
				<div className="boxChat col-md-6 offset-md-3 col-sm-12 col-12">
					<Scrollbar style={{ width: 'auto', maxHeight: '70vh', marginTop: '10px' }}>
						<ul>
							{oldQuotes.map((q) => {
								let result;

								if (q.isEditable) {
									result = (
										<form onSubmit={(evt) => handleUpdate(q.id, evt)}>
											<input
												value={q.content}
												type="text"
												onChange={(evt) => handleUpdateTyping(q.id, evt)}
												className="inputChat"
											/>

											<p className="saveChangeButton">
												<button>
													<FontAwesomeIcon icon={faSave} />
												</button>
											</p>
										</form>
									);
								} else {
									result = (
										<div>
											<p className="date">{q.date}</p>
											<p>
												<span className="liText">
													{' '}
													{state.name} mówi: {q.content}{' '}
													{q.isEdited ? (
														<span className="edited">
															edited: {CurrDate()} {CurrTime()}{' '}
														</span>
													) : (
														<span />
													)}
												</span>
											</p>
											<p className="liButtons">
												<button onClick={() => handleOnClickUpdate(q.id)}>
													<FontAwesomeIcon icon={faUserEdit} />
												</button>
												<button onClick={() => handleOnClickRemove(q.id)}>
													<FontAwesomeIcon icon={faTrash} />
												</button>
											</p>
										</div>
									);
								}
								return <li key={q.id}>{result}</li>;
							})}
						</ul>
					</Scrollbar>
					<div>
						<button
							className="changeUserNameButton"
							onClick={() => {
								dispatch({ type: ACTION_TYPES.USER_NAME_CHANGE, payload: '' });
								props.history.push('/');
							}}
						>
							Change user name
						</button>
						<form className="form" onSubmit={handleSubmit}>
							<input type="text" value={state.quote} onChange={handleInputChange} className="inputChat" />
							<button className="sendQuoteButton">Go</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;
