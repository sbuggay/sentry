import * as React from "react";

import { EStatus } from "../constants";

interface IStatusProps {
	status: EStatus;
}

export class Status extends React.Component<IStatusProps, any> {
	public getStyle() {
		return {
			marginRight: "2px"
		};
	}

	public render() {
		let className;
		let color;

		switch (this.props.status) {
			case EStatus.outage:
				className = "fa fa-exclamation-triangle";
				color = { color: "#DF3E2D" };
				break;
			case EStatus.available:
				className = "fa fa-circle";
				color = { color: "#62C552" };
				break;
			case EStatus.unknown:
				className = "fa fa-circle";
				color = { color: "gray" };
				break;
			case EStatus.issue:
				className = "fa fa-exclamation-circle";
				color = { color: "#fadf59" };
				break;
			case EStatus.maintenence:
				className = "fa fa-square";
				color = { color: "#1172C6" };
				break;
			default:
		}

		return <i className={className} style={{...this.getStyle(), ...color}} aria-hidden="true"></i>;
	}
}

export default Status;
