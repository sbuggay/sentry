import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { loadState, saveState } from "../../actions";

export class Storage extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <button onClick={() => this.props.saveState()}>save</button>
                <button onClick={() => this.props.loadState()}>load</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        saveState,
        loadState
    }, dispatch);
};

export default connect<any, any, any>(null, mapDispatchToProps)(Storage);
