import React, { useContext, useRef, useEffect } from 'react';
import { ACTION_TYPES, ReduxContext} from './reducer';
import * as io from 'socket.io-client';
import CurrDate from './CurrDate';
import CurrTime from './CurrTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUserEdit, faSave } from '@fortawesome/free-solid-svg-icons';

function Chat(props) {
	const { state, dispatch } = useContext(ReduxContext);
	const connectionRef = useRef(null);
	useEffect(
		() => {
			connectionRef.current = io.connect('https://chat-server.fbg.pl');

			connectionRef.current.on('chat message', (message) => {
				dispatch({
					type: ACTION_TYPES.CHANGEQUOTES,
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
		dispatch({ type: ACTION_TYPES.TYPEQUOTE, payload: evt.target.value });
	};
	const handleSubmit = (evt) => {
		evt.preventDefault();
		dispatch({ type: ACTION_TYPES.CHANGEQUOTES, date: CurrDate() });
		console.log(state.quotes);
		connectionRef.current.emit('Server works');
		connectionRef.current.emit('chat message', { authorId: state.name, quote: state.quote });
	};

	const handleOnClickRemove = (evt) => {
		dispatch({ type: ACTION_TYPES.REMOVEQUOTE, id: evt.target.dataset.remove });
	};

	const handleUpdateTyping = (evt) => {
		dispatch({ type: ACTION_TYPES.UPDATETYPING, payload: evt.target.value, id: evt.target.dataset.update });
	};

	const handleOnClickUpdate = (evt) => {
		dispatch({ type: ACTION_TYPES.TOGGLEEDITING, id: evt.target.dataset.update });
	};
	const handleUpdate = (evt) => {
		evt.preventDefault();
		dispatch({ type: ACTION_TYPES.UPDATE, payload: evt.target.value, id: evt.target.dataset.update });
	};

	let oldQuotes = [ ...Array.from(state.quotes) ];

	return (
		<div className="body-styling">
			<section className="box">
				<ul>
					{oldQuotes.map((q) => {
						let result;

						if (q.isEditable) {
							result = (
								<form onSubmit={handleUpdate} data-update={q.id}>
									<input
										data-update={q.id}
										value={q.content}
										type="text"
										onChange={handleUpdateTyping}
									/>
									<button>
										<FontAwesomeIcon icon={faSave} />
									</button>
								</form>
							);
						} else {
							result = (
								<p>
									<span className="date">{q.date}</span> {state.name} mówi: {q.content}{' '}
									{q.isEdited ? (
										<span className="edited">
											edited: {CurrDate()} {CurrTime()}{' '}
										</span>
									) : (
										<span />
									)}
									<button data-update={q.id} onClick={handleOnClickUpdate}>
										<FontAwesomeIcon icon={faUserEdit} />
									</button>
									<button onClick={handleOnClickRemove} data-remove={q.id}>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								</p>
							);
						}
						return <li key={q.id}>{result}</li>;
					})}
				</ul>
				<form className="form" onSubmit={handleSubmit}>
					<input type="text" value={state.quote} onChange={handleInputChange} />
					<button>Go</button>
				</form>
			</section>
		</div>
	);
}

export default Chat;
