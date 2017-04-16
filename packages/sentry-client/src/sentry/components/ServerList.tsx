import * as React from "react";
import { connect } from "react-redux";

import Server from "./Server";

import { initializePolling } from "../actions";

interface IServerListProps {
	servers?: {
		[id: string]: Object
	};
	initializePolling?: Function;
};

export class ServerList extends React.Component<IServerListProps, any> {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		this.props.initializePolling();
	}

	render() {
		return (
			<div>
				{Object.keys(this.props.servers).map((id, index) => {
					return <Server key={index} server={this.props.servers[id]} />;
				})}
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		servers: state.app.servers
	};
};

const mapDispatchToProps = (dispatch: Function) => {
	return {
		initializePolling: () => dispatch(initializePolling())
	};
};

export default connect<IServerListProps, any, any>(mapStateToProps, mapDispatchToProps)(ServerList);