import * as React from "react";

// Helper function to render a flex row with left/right spans
export function renderRow(label: string, data: string) {
	function getStyle(): React.CSSProperties {
		return {
			display: "flex",
			justifyContent: "space-between",
			height: "20px",
			padding: "2px 0",
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
			padding: "2px 0",
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
