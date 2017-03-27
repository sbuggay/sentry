import * as React from "react";

import * as status from "../constants/status";

export class Status extends React.Component {
	render() {
		let className, style;

		switch (this.props.status) {
		case status.STATUS_AVAILABLE:
			className = "fa fa-circle";
			style = { color: "#229926" };
			break;
		case status.STATUS_ISSUE:
			className = "fa fa-exclamation-circle";
			style = { color: "#FEE032" };
			break;
		case status.STATUS_MAINTENANCE:
			className = "fa fa-square";
			style = { color: "#1172C6" };
			break;
		default:
		case status.STATUS_OUTAGE:
			className = "fa fa-exclamation-triangle";
			style = { color: "#951A1D" };
			break;
		}

		return <i className={className} style={style} aria-hidden="true"></i>;
	}
}

export default Status;
