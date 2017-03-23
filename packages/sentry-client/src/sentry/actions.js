import * as actionsTypes from "./actionTypes";

export const addServer = (serverHostname) => ({
	type: actionsTypes.ADD_SERVER,
	payload: serverHostname
});

export const removeServer = (serverHostname) => ({
	type: actionsTypes.REMOVE_SERVER,
	payload: serverHostname
});