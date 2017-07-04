import * as React from "react";
import { connect } from "react-redux";

interface ILastUpdatedProps {
    lastUpdated?: number
}

export class LastUpdated extends React.Component<any, any> {

    getStyle() {
        return {
            fontSize: "14px",
            color: "#adb0af"
        }
    }

    render(): JSX.Element {
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

export default connect(mapStateToProps)(LastUpdated);
