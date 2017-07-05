import * as React from "react";
import { connect } from "react-redux";

interface ILastUpdatedProps {
    lastUpdated?: number
}

export class LastUpdated extends React.Component<ILastUpdatedProps, any> {

    getStyle() {
        return {
            fontSize: "14px",
            color: "#adb0af"
        }
    }

    render(): JSX.Element | null {
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

export default connect<ILastUpdatedProps, any, any>(null, mapStateToProps)(LastUpdated);
