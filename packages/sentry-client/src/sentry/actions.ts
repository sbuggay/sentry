import * as actionTypes from "./actionTypes";

import { POLLING_TIME } from "./constants/polling";
import { STATUS } from "./constants/status";
import { load, save } from "./lib/storage";

import { IState } from "./reducer";

export const initialize = () => {
    return (dispatch: Function, getState: Function) => {
        dispatch(loadState());
    }
}

export const addServer = (name: String, host: String, id: String) => {
    return {
        type: actionTypes.ADD_SERVER,
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
        type: actionTypes.REMOVE_SERVER,
        payload: id
    };
};

export const editServer = (payload: any) => {
    return (dispatch: Function, getState: Function) => {
        dispatch({
            type: actionTypes.EDIT_SERVER,
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
        Object.keys(state.servers).map((key) => {
            dispatch(pollServer(state.servers[key]));
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
                        type: actionTypes.POLL_SERVER,
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
                    type: actionTypes.POLL_SERVER,
                    payload: {
                        id: server.id,
                        status: STATUS.OUTAGE,
                        data: undefined,
                    }
                });
            }
            dispatch(updateLastUpdated(Date.now()));
        }).catch((reason: Error) => {
            console.error(reason);
        });
    };
};

// Saves the state tree to localstorage/other
export const saveState = () => {
    return (dispatch: Function, getState: Function) => {
        save(getState().app);
    }
}


// Loads the state tree from localstorage/other
export const loadState = () => {
    const state: any = load();
    return {
        type: actionTypes.LOAD_STATE,
        payload: state
    }
}

export const updateLastUpdated = (date: number) => {
    return {
        type: actionTypes.UPDATE_LAST_UPDATED,
        payload: date
    }
}
