// require("file-loader?name=[name].[ext]!../dist/index.html");

import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./components/App";

import rootReducer from "./rootReducer";

export const store = createStore(
	rootReducer,
	applyMiddleware(thunk)
);

// Initial render entry point
export default ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("app") || document.createElement("div")
);
