import * as React from "react";
import { connect } from "react-redux";

// interface ILastUpdatedProps {
//     lastUpdated?: number;
// }

export class LastUpdated extends React.Component<any, any> {

	public getStyle() {
		return {
			fontSize: "14px"
		};
	}

	public render(): JSX.Element | null {
		if (this.props.lastUpdated === undefined) {
			return null;
		}

		return (
			<div style={this.getStyle()}>
				Last updated {new Date(this.props.lastUpdated).toTimeString()}
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		lastUpdated: state.lastUpdated
	};
};

export default connect<any, any, any>(mapStateToProps)(LastUpdated);
