import * as actionsTypes from "./actionTypes";

import { Action } from "./actionTypes";

import { POLLING_TIME } from "./constants/polling";
import { STATUS } from "./constants/status";

export const addServer = (name: String, host: String, id: String) => {
    return {
        type: actionsTypes.ADD_SERVER,
        payload: {
            id: id,
            name: name,
            host: host,
            status: STATUS.OUTAGE
        }
    }
};

export const removeServer = (id: String) => {
    return {
        type: actionsTypes.REMOVE_SERVER,
        payload: id
    };
};

export const editServer = (payload: any) => {
    return (dispatch: Function, getState: Function) => {
        dispatch({
            type: actionsTypes.EDIT_SERVER,
            payload
        });
    };
};

export const initializePolling = () => {
    return (dispatch: Function, getState: Function) => {
        setInterval(() => dispatch(pollServers()), POLLING_TIME);
    };
};

export const pollServers = () => {
    return (dispatch: Function, getState: Function) => {
        const state = getState();
        Object.keys(state.app.servers).map((key) => {
            dispatch(pollServer(state.app.servers[key]));
        });
    };
};

export const pollServer = (server: any) => {
    return (dispatch: Function, getState: Function) => {
        let requestInit: RequestInit = {
            method: "GET",
            headers: new Headers(),
            cache: "default"
        };

        fetch(server.host, requestInit).then((response: Response) => {
            // We care about the responseCode and the body

            // Go ahead and set status to unavailable
            let status = STATUS.OUTAGE;

            // If response body is in expected format, read it
            // Set to issue, availble, or maintainence accordingly

            // TODO: Refactor
            if (response.ok) {
                response.json().then((json: JSON) => {
                    dispatch({
                        type: actionsTypes.POLL_SERVER,
                        payload: {
                            id: server.id,
                            status: STATUS.AVAILABLE,
                            data: json,
                        }
                    });
                });
            }
            else {
                dispatch({
                    type: actionsTypes.POLL_SERVER,
                    payload: {
                        id: server.id,
                        status: STATUS.OUTAGE,
                        data: undefined,
                    }
                });
            }


        }).catch((reason: Error) => {
            console.error(reason);
        });
    };
};

// Saves the state tree to localstorage/other
export const saveState = () => {

}


// Loads the state tree from localstorage/other
export const loadState = () => {

}
