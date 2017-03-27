require("file-loader?name=[name].[ext]!../dist/index.html");

import React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./sentry/components/App";

import rootReducer from "./rootReducer";

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("app")
);