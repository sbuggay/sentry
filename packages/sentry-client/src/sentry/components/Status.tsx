import * as React from "react";

import { STATUS } from "../constants/status";

interface IStatusProps {
	status: any;
}

export class Status extends React.Component<IStatusProps, any> {
	render() {
		let className, style;

		switch (this.props.status) {
			case STATUS.AVAILABLE:
				className = "fa fa-circle";
				style = { color: "#229926" };
				break;
			case STATUS.ISSUE:
				className = "fa fa-exclamation-circle";
				style = { color: "#FEE032" };
				break;
			case STATUS.MAINTENANCE:
				className = "fa fa-square";
				style = { color: "#1172C6" };
				break;
			default:
			case STATUS.OUTAGE:
				className = "fa fa-exclamation-triangle";
				style = { color: "#951A1D" };
				break;
		}

		return <i className={className} style={style} aria-hidden="true"></i>;
	}
}

export default Status;
