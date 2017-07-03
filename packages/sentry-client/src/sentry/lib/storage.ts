import { IState } from "../reducer";

export function load(): IState {
    return JSON.parse(localStorage.getItem("store"));
}

export function save(store: IState) {
    localStorage.setItem("store", JSON.stringify(store));
}