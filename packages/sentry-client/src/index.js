"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var redux_thunk_1 = require("redux-thunk");
var App_1 = require("./sentry/components/App");
var rootReducer_1 = require("./rootReducer");
var store = redux_1.createStore(rootReducer_1.default, redux_1.applyMiddleware(redux_thunk_1.default));
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(App_1.default, null)), document.getElementById("app"));
//# sourceMappingURL=index.js.map