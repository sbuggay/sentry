import * as actionTypes from "./actionTypes";

// Perhaps transition to redux-actions?
// import { Action, handleAction } from "redux-actions";

export interface IState {
    title: string;
    servers: {
        [id: string]: Object
    };
    lastUpdated?: number;
};

export const initialState: IState = {
    title: "System Status",
    servers: {
                1: {
            id: 1,
            name: "macbook",
            host: "http://127.0.0.1:3333"
        },
        2: {
            id: 2,
            name: "devan.space",
            host: "http://devan.space:3333"
        },
        3: {
            id: 3,
            name: "bender",
            host: "http://cocytus.xyz:3333"
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

        case actionTypes.UPDATE_LAST_UPDATED:
            return {
                ...state,
                lastUpdated: payload
            }

        default:
            return state;
    }
};

export default reducer;