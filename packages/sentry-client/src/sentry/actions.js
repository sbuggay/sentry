import * as actionsTypes from "./actionTypes";

export const addServer = (payload) => {
	return {
		type: actionsTypes.ADD_SERVER,
		payload
	}
};

export const removeServer = (payload) => {
	return {
		type: actionsTypes.REMOVE_SERVER,
		payload
	};
};

export const editServer = (payload) => {
	return {
		type: actionsTypes.EDIT_SERVER,
		payload
	};
};

export const pollServer = (payload) => {
	return {
		type: actionsTypes.POLL_SERVER,
		payload
	};
};


