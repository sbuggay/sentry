import * as React from "react";

import Data from "./Data";
import Services from "./Services";
import { IServer } from "../../reducer";

// Helper function to render a flex row with left/right spans
export function renderRow(label: string, data: string) {
	function getStyle(): React.CSSProperties {
		return {
			display: "flex",
			justifyContent: "space-between",
			height: "20px",
			padding: "2px 4px",
			alignItems: "center"
		};
	}

	return (
		<div style={getStyle()}>
			<span style={{ opacity: 0.6 }}>{label}</span>
			<span>{data}</span>
		</div >
	);
}

export function renderRowSpan(label: string, data: JSX.Element) {
	function getStyle(): React.CSSProperties {
		return {
			display: "flex",
			justifyContent: "space-between",
			height: "20px",
			padding: "2px 4px",
			alignItems: "center"
		};
	}

	return (
		<div style={getStyle()}>
			<span style={{ opacity: 0.6 }}>{label}</span>
			{data}
		</div >
	);
}

interface IDetailsProps {
	server: IServer;
}

export default class Details extends React.Component<IDetailsProps, any> {
	public render() {
		function getDetailStyle() {
			return {
				fontSize: "14px",
				marginBottom: "10px"
			};
		}

		return (
			<div style={getDetailStyle()}>
				<Data server={this.props.server} />
				<Services services={this.props.server.serviceInfo} />
			</div>
		);
	}
}
