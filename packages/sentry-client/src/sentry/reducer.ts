import * as actionTypes from "./actionTypes";

import { Action, handleAction } from "redux-actions";

interface IState {
	title: string;
	servers: {
		[id: string]: Object
	};
};

export const initialState: IState = {
	title: "test title",
	servers: {
		id: {
			id: "id",
			name: "macbook",
			host: "http://127.0.0.1:3333"
		} 
	}
};

const reducer = (state = initialState, action: any) => {
	let payload = action.payload;

	switch (action.type) {
		case actionTypes.ADD_SERVER:
			return {
				...state,
				servers: {
					...state.servers,
					[payload.id]: { ...payload }
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
						status: payload.status,
						data: payload.data
					}
				}
			};

		case actionTypes.LOAD_STATE:
			return {
				...state,
				...payload
			};

		default:
			return state;
	}
};

export default reducer;