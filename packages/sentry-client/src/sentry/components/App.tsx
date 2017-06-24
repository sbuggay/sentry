import * as React from "react";
import { connect } from "react-redux";

import ServerList from "./ServerList";
import ServerForm from "./ServerForm";
import Status from "./Status";

import { addServer } from "../actions";

import { guid } from "../lib/utils";

import { STATUS } from "../constants/status";

interface IDispatchProps {
	addServer?: Function;
};

class App extends React.Component<IDispatchProps, any> {
	onServerInputSubmit(values: Object) {
		console.log(values);
		this.props.addServer(values);
	}

	render() {
		return <div>
			<Status status={STATUS.AVAILABLE} />
			<Status status={STATUS.ISSUE} />
			<Status status={STATUS.OUTAGE} />
			<Status status={STATUS.MAINTENANCE} />
			<ServerForm handleSubmit={this.onServerInputSubmit.bind(this)} />
			<ServerList />
		</div>;
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		addServer: (values: any) => {
			dispatch(addServer(values.nameValue, values.hostValue, guid()));
		}
	};
};

export default connect<any, IDispatchProps, any>(undefined, mapDispatchToProps)(App);