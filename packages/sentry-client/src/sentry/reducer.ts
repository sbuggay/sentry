import * as actionTypes from "./actionTypes";

export const initialState = {
	title: "test title",
	servers: {}
};

const reducer = (state = initialState, action) => {
	let payload = action.payload;

	switch (action.type) {
		case actionTypes.ADD_SERVER:
			return {
				...state,
				servers: {
					...state.servers,
					[payload.id]: { ...payload.server, id: payload.id }
				}
			};
		case actionTypes.REMOVE_SERVER:
			return {
				...state
			};
		
		case actionTypes.POLL_SERVER:
			return {
				...state,
				servers: {
					...state.servers,
					[payload.id]: {
						...state.servers[payload.id],
						status: payload.status
					}
				}
			};
		default:
			return state;
	}
};

export default reducer;