import { IState, initialState } from "../reducer";

export function load(): IState {
	const store = localStorage.getItem("store");

	if (store) {
		return JSON.parse(store);
	} else {
		return initialState;
	}
}

export function save(store: IState) {
	localStorage.setItem("store", JSON.stringify(store));
}
