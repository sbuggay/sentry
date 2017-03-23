import * as actionsTypes from "./actionTypes";

export const addServer = (payload) => {
	return {
		type: actionsTypes.ADD_SERVER,
		payload
	}
};

export const removeServer = (serverHostname) => {
	return {
		type: actionsTypes.REMOVE_SERVER,
		payload
	};
}