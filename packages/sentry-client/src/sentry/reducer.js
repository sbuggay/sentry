import * as actionTypes from "./actionTypes";

export const initialState = {
	title: "test title",
	servers: []
};

const reducer = (state = initialState, action) => {
	let payload = action.payload;

	switch (action.type) {
	case actionTypes.ADD_SERVER:
		return {
			...state,
			servers: [
				...state.servers,
				payload
			]
		};
	case actionTypes.REMOVE_SERVER:
		return {
			...state
		};
	default:
		return state;
	}
};

export default reducer;