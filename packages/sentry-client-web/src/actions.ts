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

        // Allow for localStorage override of API endpoint
        const hostEndpoint = localStorage.getItem("hostEndpoint");
        const endpoint = hostEndpoint ? hostEndpoint : "/api";

        dispatch({
            type: actionTypes.SERVER_POLL
        });

        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (this.readyState === this.DONE) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    dispatch({
                        type: actionTypes.SERVER_POLL_SUCCESS,
                        payload: data
                    });
                } else {
                    dispatch({
                        type: actionTypes.SERVER_POLL_FAILURE,
                        payload: this.responseText
                    });
                }
            }
        };

        xhr.open("GET", endpoint, true);
        xhr.send();
    };
};

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
