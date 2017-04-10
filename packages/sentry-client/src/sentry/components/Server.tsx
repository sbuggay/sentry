import * as React from "react";
import Status from "./Status";

import { removeServer } from "../actions";
import { connect } from "react-redux";

interface IStateProps {
	server: any;
	index: Number;
};

interface IDispatchProps {
	removeServer: Function;
};

export class Server extends React.Component<IStateProps & IDispatchProps, any> {
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
			<Status status={this.props.server.status} />
			{this.props.server.url}
			<div className="fa fa-times" onClick={() => this.removeServer.bind(this)}></div>
		</div>;
	}
}


const mapDispatchToProps = (dispatch: Function) => {
	return {
		removeServer: () => dispatch(removeServer)
	};
};

export default connect<IStateProps, IDispatchProps, any>(undefined, mapDispatchToProps)(Server);
