import { combineReducers } from "redux";
import reducer from "./sentry/reducer";

const reducers = {
	app: reducer
};

export default combineReducers(reducers);