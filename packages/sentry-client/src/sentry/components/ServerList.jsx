import * as React from "react";
import { connect } from "react-redux";

export class ServerList extends React.Component {
	render() {
		return (<div>
		</div>);
	}
}

const mapStateToProps = (state) => {
	return {
		servers: state.servers
	}
}

export default connect(mapStateToProps)(ServerList);