import * as actionsTypes from "./actionTypes";

export const addServer = (payload) => {
	return (dispatch, getState) => {
		dispatch({
			type: actionsTypes.ADD_SERVER,
			payload
		});
	};
};

export const removeServer = (payload) => {
	return (dispatch, getState) => {
		dispatch({
			type: actionsTypes.REMOVE_SERVER,
			payload
		});
	};
};

export const editServer = (payload) => {
	return (dispatch, getState) => {
		dispatch({
			type: actionsTypes.EDIT_SERVER,
			payload
		});
	};
};

export const initializePolling = () => {
	return (dispatch, getState) => {
		setInterval(() => dispatch(pollServers()), 10000);
	};
};

export const pollServers = () => {
	return (dispatch, getState) => {
		const state = getState();
		state.app.servers.map((server, index) => {
			dispatch(pollServer(server));
		});
	};
};

export const pollServer = (payload) => {
	return (dispatch, getState) => {
		let init = {
			method: "GET",
			headers: new Headers(),
			mode: "cors",
			cache: "default"
		};

		fetch(payload).then(response => {
			dispatch({
				type: actionsTypes.POLL_SERVER,
				payload
			});
		});
	};
};


