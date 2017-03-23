import * as React from "react";

export class Server extends React.Component {
	render() {
		return <h1>{this.props.hostname}</h1>;
	}
}

export default Server;