import * as actionTypes from "./actionTypes";

import { Dispatch } from "redux";

import { POLLING_TIME, EStatus } from "./constants";
import { load, save } from "./lib/storage";

import { IState } from "./reducer";

// Syncronous actions
export const addServer = (name: string, host: string, id: string) => {
    return {
        type: actionTypes.SERVER_ADD,
        payload: {
            id,
            name,
            host,
            status: EStatus.outage
        }
    };
};

export const removeServer = (id: string) => {
    return {
        type: actionTypes.SERVER_REMOVE,
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
    return {
        type: actionTypes.SERVER_EDIT,
        payload
    };
};

export const initializePolling = () => {
    return (dispatch: Dispatch<IState>, getState: () => IState) => {
        setInterval(() => dispatch(pollServers()), POLLING_TIME);
    };
};

export const pollServers = () => {
    return (dispatch: Dispatch<IState>, getState: () => IState) => {
        const endpoint = "http://127.0.0.1:3030/api";
        const requestInit: RequestInit = {
            method: "GET",
            headers: new Headers(),
            cache: "no-store"
        };

        dispatch({
            type: actionTypes.SERVER_POLL
        });

        fetch(endpoint, requestInit).then((response: Response) => {
            response.json().then((data: JSON) => {
                console.log(data);
                dispatch({
                    type: actionTypes.SERVER_POLL_SUCCESS,
                    payload: data
                });
            });
        }).catch((error: Error) => {
            dispatch({
                type: actionTypes.SERVER_POLL_FAILURE,
                payload: error
            });
        });
    };
};

// export const pollServer = (server: any) => {
//     return (dispatch: Dispatch<IState>, getState: () => IState) => {
//         const requestInit: RequestInit = {
//             method: "GET",
//             headers: new Headers(),
//             cache: "no-store"
//         };

//         fetch(server.host, requestInit).then((response: Response) => {
//             // We care about the responseCode and the body

//             // Go ahead and set status to unavailable
//             const status = response.ok ? EStatus.available : EStatus.outage;
//             response.json().then((data: JSON) => {
//                 dispatch({
//                     type: actionTypes.SERVER_POLL_SUCCESS,
//                     payload: {
//                         id: server.id,
//                         status,
//                         ...data
//                     }
//                 });
//             });

//             dispatch(updateLastUpdated(Date.now()));
//         }).catch((reason: Error) => {
//             dispatch({
//                 type: actionTypes.SERVER_POLL_FAILURE,
//                 payload: {
//                     id: server.id,
//                     status: EStatus.outage,
//                 }
//             });
//         });
//     };
// };

export const changeView = (view: number) => {
    return {
        type: actionTypes.VIEW_CHANGE,
        payload: view
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
        type: actionTypes.STATE_LOAD,
        payload: state
    };
};

export const updateLastUpdated = (date: number) => {
    return {
        type: actionTypes.UPDATE_LAST_UPDATED,
        payload: date
    };
};
