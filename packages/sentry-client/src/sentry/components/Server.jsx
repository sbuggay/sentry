import * as React from "react";
import Status from "./Status";

export class Server extends React.Component {

	

	render() {
		let style = {
			width: "220px",
			height: "40px",
			border: "1px solid black",
			display: "flex"
		};
		return <div style={style}><Status /> {this.props.info}</div>;
	}
}

export default Server;