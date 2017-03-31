import * as React from "react";
import Status from "./Status";

import { removeServer } from "../actions";
import { connect } from "react-redux";

export class Server extends React.Component {

	removeServer(){
		this.props.removeServer(this.props.key);
	}

	render() {
		let style = {
			width: "220px",
			height: "40px",
			border: "1px solid black",
			display: "flex"
		};
		return <div style={style}>
			<Status status={this.props.server.status} />
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