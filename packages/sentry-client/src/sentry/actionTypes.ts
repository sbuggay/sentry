export interface Action<T> {
    type: string;
    payload: T;
    error?: boolean;
    meta?: any;
}

export const INITIALIZE = "INITIALIZE";

export const ADD_SERVER = "ADD_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";
export const EDIT_SERVER = "EDIT_SERVER";
export const POLL_SERVER = "POLL_SERVER";

export const LOAD_STATE = "LOAD_SERVER";
export const SAVE_STATE = "SAVE_STATE";
export const UPDATE_LAST_UPDATED = "UPDATE_LAST_UPDATED";