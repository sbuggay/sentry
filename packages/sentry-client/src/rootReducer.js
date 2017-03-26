import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import reducer from "./sentry/reducer";

const reducers = {
	app: reducer,
	form: formReducer
};

export default combineReducers(reducers);