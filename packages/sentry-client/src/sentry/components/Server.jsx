import * as React from "react";
import Status from "./Status";

import { removeServer } from "../actions";
import { connect } from "react-redux";

export class Server extends React.Component {
	getStyles() {
		return {
			width: "220px",
			height: "40px",
			border: "1px solid black",
			display: "flex"
		};
	}

	removeServer() {
		this.props.removeServer(this.props.index);
	}

	render() {
		return <div style={this.getStyles()}>
			<Status />
			{this.props.server.url}
			<div className="fa fa-times" onClick={() => this.removeServer.bind(this)}></div>
		</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		servers: state.app.servers
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		removeServer: () => dispatch(removeServer())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Server);
