import * as actionTypes from "./actionTypes";

const initialState = {
	title: "test title"
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_SERVER:
			return state;
		case actionTypes.REMOVE_SERVER:
			return state;
		default:
			return state;
	};
};

export default reducer;

