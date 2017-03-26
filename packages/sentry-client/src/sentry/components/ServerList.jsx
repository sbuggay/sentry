import * as React from "react";
import { connect } from "react-redux";

import { Server } from "./Server";

export class ServerList extends React.Component {
	render() {
		return (
			<div>
				{this.props.servers.map((name, index) => {
					return <Server key={index} info={name} />;
				})}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		servers: state.app.servers
	}
}

export default connect(mapStateToProps)(ServerList);