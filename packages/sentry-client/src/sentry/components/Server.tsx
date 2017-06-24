import * as React from "react";
import Status from "./Status";

import { removeServer } from "../actions";
import { connect } from "react-redux";

interface IStateProps {
	server: any;
	index: Number;
};

interface IDispatchProps {
	removeServer?: Function;
};

export class Server extends React.Component<IStateProps & IDispatchProps, any> {
	getStyles() {
		return {
			width: "200px",
			height: "40px",
		};
	}

	render() {
		return <div style={this.getStyles()}>
			<Status status={this.props.server.status} />
			{this.props.server.name}
		</div>;
	}
}


const mapDispatchToProps = (dispatch: Function) => {
	return {
		removeServer: () => dispatch(removeServer)
	};
};

export default connect<IStateProps, IDispatchProps, any>(undefined, mapDispatchToProps)(Server);
