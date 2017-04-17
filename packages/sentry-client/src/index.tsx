// require("file-loader?name=[name].[ext]!../dist/index.html");

import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./sentry/components/App";

import rootReducer from "./rootReducer";

const store = createStore(
	rootReducer,
	applyMiddleware(thunk),
	(window as any).devToolsExtension ? (window as any).devToolsExtension() : undefined
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("app")
);