import * as React from "react";
import Status from "./Status";

export class Server extends React.Component {
	render() {
		return <div><Status /> {this.props.info}</div>;
	}
}

export default Server;