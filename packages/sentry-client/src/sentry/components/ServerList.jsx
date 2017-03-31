import * as React from "react";
import { connect } from "react-redux";

import Server from "./Server";

import { initializePolling } from "../actions";

export class ServerList extends React.Component {
	componentDidMount() {
		this.props.initializePolling();
	}

	render() {
		return (
			<div>
				{Object.keys(this.props.servers).map((key, index) => {
					return <Server key={index} server={this.props.servers[key]}/>;
				})}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		servers: state.app.servers
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		initializePolling: () => dispatch(initializePolling())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerList);