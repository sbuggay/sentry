import * as actionTypes from "./actionTypes";

import { Dispatch } from "redux";

import { POLLING_TIME } from "./constants/polling";
import { STATUS } from "./constants/status";
import { load, save } from "./lib/storage";

import { IState } from "./reducer";

// Syncronous actions
export const addServer = (name: string, host: string, id: string) => {
    return {
        type: actionTypes.ADD_SERVER,
        payload: {
            id,
            name,
            host,
            status: STATUS.OUTAGE
        }
    };
};

export const removeServer = (id: string) => {
    return {
        type: actionTypes.REMOVE_SERVER,
        payload: id
    };
};

// Asyncronous actions
export const initialize = () => {
    return (dispatch: Dispatch<IState>) => {
        dispatch(loadState());
    };
};

export const editServer = (payload: any) => {
    return (dispatch: Dispatch<IState>, getState: () => IState) => {
        dispatch({
            type: actionTypes.EDIT_SERVER,
            payload
        });
    };
};

export const initializePolling = () => {
    return (dispatch: Dispatch<IState>, getState: () => IState) => {
        setInterval(() => dispatch(pollServers()), POLLING_TIME);
    };
};

export const pollServers = () => {
    return (dispatch: Dispatch<IState>, getState: () => IState) => {
        const state = getState();
        Object.keys(state.servers).map((key) => {
            dispatch(pollServer(state.servers[key]));
        });
    };
};

export const pollServer = (server: any) => {
    return (dispatch: Dispatch<IState>, getState: () => IState) => {
        const requestInit: RequestInit = {
            method: "GET",
            headers: new Headers(),
            cache: "default"
        };

        fetch(server.host, requestInit).then((response: Response) => {
            // We care about the responseCode and the body

            // Go ahead and set status to unavailable
            const status = response.ok ? STATUS.AVAILABLE : STATUS.OUTAGE;
            response.json().then((data: JSON) => {
                dispatch({
                    type: actionTypes.POLL_SERVER,
                    payload: {
                        id: server.id,
                        status,
                        ...data
                    }
                });
            });

            dispatch(updateLastUpdated(Date.now()));
        }).catch((reason: Error) => {
            dispatch({
                type: actionTypes.POLL_SERVER,
                payload: {
                    id: server.id,
                    status: STATUS.OUTAGE,
                }
            });
        });
    };
};

// Saves the state tree to localstorage/other
export const saveState = () => {
    return (dispatch: Dispatch<IState>, getState: () => IState) => {
        save(getState());
    };
};

// Loads the state tree from localstorage/other
export const loadState = () => {
    const state: IState = load();
    return {
        type: actionTypes.LOAD_STATE,
        payload: state
    };
};

export const updateLastUpdated = (date: number) => {
    return {
        type: actionTypes.UPDATE_LAST_UPDATED,
        payload: date
    };
};
