import * as React from "react";
import { connect } from "react-redux";

interface ILastUpdatedProps {
    lastUpdated?: number
}

export class LastUpdated extends React.Component<any, any> {

    render(): JSX.Element {
        return (
            <div>
                Last updated {this.props.lastUpdated}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        lastUpdated: state.app.lastUpdated
    };
};

export default connect(mapStateToProps)(LastUpdated);
