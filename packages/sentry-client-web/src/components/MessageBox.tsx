import * as React from "react";

interface IMessageBoxProps {
	message: string;
	style?: React.CSSProperties;
	textStyle?: React.CSSProperties;
}

export class MessageBox extends React.Component<IMessageBoxProps, any> {
	public getStyle(): React.CSSProperties {
		return {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			...this.props.style
		};
	}

	public getTextStyle(): React.CSSProperties {
		return {
			...this.props.textStyle
		};
	}

	public render() {
		return (
			<div style={this.getStyle()}>
				<div style={this.getTextStyle()}>
					{this.props.message}
				</div>
			</div>
		);
	}
}

export default MessageBox;
