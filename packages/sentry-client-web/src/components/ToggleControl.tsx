import * as React from "react";

export class ToggleControl extends React.Component<any, any> {

	public getStyle(): React.CSSProperties {
		return {
			width: "16px",
			height: "16px",
			margin: "1px"
		};
	}

	public render(): JSX.Element | null {
		return (
			<div style={this.getStyle()}>
				<i className="fa fa-expand" aria-hidden="true"></i>
			</div>
		);
	}
}

export default ToggleControl;
