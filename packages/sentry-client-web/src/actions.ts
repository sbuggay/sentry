import * as actionTypes from "./actionTypes";

import { POLLING_TIME, EStatus } from "./constants";
import { load, save } from "./lib/storage";

import { IState } from "./reducer";

// Syncronous actions
export const addServer = (name: string, host: string, id: string) => {
	return {
		type: actionTypes.SERVER_ADD,
		payload: {
			id,
			name,
			host,
			status: EStatus.outage
		}
	};
};

export const removeServer = (id: string) => {
	return {
		type: actionTypes.SERVER_REMOVE,
		payload: id
	};
};

// Asyncronous actions
export const initialize = () => {
	return (dispatch: any) => {
		dispatch(loadState());
	};
};

export const editServer = (payload: any) => {
	return {
		type: actionTypes.SERVER_EDIT,
		payload
	};
};

export const initializePolling = () => {
	return (dispatch: any, getState: () => IState) => {
		setInterval(() => dispatch(pollServers()), POLLING_TIME);
	};
};

export const pollServers = () => {
	return (dispatch: any, getState: () => IState) => {

		// Allow for localStorage override of API endpoint
		const hostEndpoint = localStorage.getItem("hostEndpoint");
		const endpoint = hostEndpoint ? hostEndpoint : "/api";

		dispatch({
			type: actionTypes.SERVER_POLL
		});

		fetch(endpoint).then((response) => response.json()).then((data) => {
			dispatch({
				type: actionTypes.SERVER_POLL_SUCCESS,
				payload: data
			});
		}).catch((error) => {
			console.error(error);
		});
	};
};

export const changeView = (view: number) => {
	return {
		type: actionTypes.VIEW_CHANGE,
		payload: view
	};
};

// Saves the state tree to localstorage/other
export const saveState = () => {
	return (dispatch: any, getState: () => IState) => {
		save(getState());
	};
};

// Loads the state tree from localstorage/other
export const loadState = () => {
	const state: IState = load();
	return {
		type: actionTypes.STATE_LOAD,
		payload: state
	};
};

export const updateLastUpdated = (date: number) => {
	return {
		type: actionTypes.UPDATE_LAST_UPDATED,
		payload: date
	};
};
