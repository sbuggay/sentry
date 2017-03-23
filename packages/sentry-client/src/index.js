require("file-loader?name=[name].[ext]!../static/index.html");

import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from "./sentry/components/App";

import reducer from "./sentry/reducer";

let store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);