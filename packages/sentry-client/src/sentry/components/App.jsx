import * as React from "react";
import { connect } from "react-redux";

import ServerList from "./ServerList";
import ServerInput from "./ServerInput";
import Status from "./Status";

import { addServer } from "../actions";

import * as status from "../constants/status";

class App extends React.Component {
	onServerInputSubmit(values) {
		this.props.addServer(values.hostname);
	}

	render() {
		return <div>
			<Status status={status.STATUS_AVAILABLE} />
			<Status status={status.STATUS_ISSUE} />
			<Status status={status.STATUS_OUTAGE} />
			<Status status={status.STATUS_MAINTENANCE} />
			<ServerInput onSubmit={this.onServerInputSubmit.bind(this)} />
			<ServerList />

			
		</div>;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addServer: (values) => {
			dispatch(addServer(values));
		}
	};
};

export default connect(undefined, mapDispatchToProps)(App);