export interface Action<T> {
	type: string;
	payload: T;
	error?: boolean;
	meta?: any;
}

export const ADD_SERVER = "ADD_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";
export const EDIT_SERVER = "EDIT_SERVER";
export const POLL_SERVER = "POLL_SERVER";