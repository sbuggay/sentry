import * as actionsTypes from "./actionTypes";

import { Action } from "./actionTypes";

import { POLLING_TIME } from "./constants/polling";
import { STATUS } from "./constants/status";
import { guid } from "./lib/utils";

export const addServer = (server: String) => {
	let id = guid();
	return (dispatch: Function, getState: Function) => {
		dispatch({
			type: actionsTypes.ADD_SERVER,
			payload: {
				id: id,
				server: {
					url: server,
					status: STATUS.OUTAGE
				}
			}
		});
		dispatch(pollServer(id));
	};
};

export const removeServer = (id: String) => {
	return (dispatch: Function, getState: Function) => {
		dispatch({
			type: actionsTypes.REMOVE_SERVER,
			payload: id
		});
	};
};

export const editServer = (payload: any) => {
	return (dispatch: Function, getState: Function) => {
		dispatch({
			type: actionsTypes.EDIT_SERVER,
			payload
		});
	};
};

export const initializePolling = () => {
	return (dispatch: Function, getState: Function) => {
		setInterval(() => dispatch(pollServers()), POLLING_TIME);
	};
};

export const pollServers = () => {
	return (dispatch: Function, getState: Function) => {
		const state = getState();
		Object.keys(state.app.servers).map((key) => {
			dispatch(pollServer(state.app.servers[key]));
		});
	};
};

export const pollServer = (server: any) => {
	return (dispatch: Function, getState: Function) => {
		let requestInit = {
			method: "GET",
			headers: new Headers(),
			mode: "cors",
			cache: "default"
		};

		fetch(server.url, requestInit).then(response => {
			// We care about the responseCode and the body

			// Go ahead and set status to unavailable
			let status = STATUS.OUTAGE;

			// If responseCode is 200, elevate to issue
			if (response.status === 200) {
				status = STATUS.ISSUE;
			}

			// If response body is in expected format, read it
			// Set to issue, availble, or maintainence accordingly

			dispatch({
				type: actionsTypes.POLL_SERVER,
				payload: {
					id: server.id,
					status: status,
					body: response.body,
				}
			});
		}).catch(reason => {
			console.error(reason);
		});
	};
};

// Saves the state tree to localstorage/other
export const saveState = () => {

}


// Loads the state tree from localstorage/other
export const loadState = () => {

}
