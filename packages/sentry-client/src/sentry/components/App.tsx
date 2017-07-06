import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import List from "./List";
import ServerForm from "./ServerForm";
import ServerViewSelect from "./ViewSelect";
import LastUpdated from "./LastUpdated";
import Legend from "./Legend";
import Storage from "./Storage";

import { initialize, addServer } from "../actions";

interface IDispatchProps {
    title?: string;
    initialize?: () => any;
    addServer?: (values: object) => any;
}

export class App extends React.Component<IDispatchProps, any> {

    public componentDidMount() {
        if (this.props.initialize) {
            this.props.initialize();
        }
    }

    public onServerInputSubmit(values: object) {
        if (this.props.addServer) {
            this.props.addServer(values);
        }
    }

    public getStyle() {
        return {
            maxWidth: "900px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto"
        };
    }

    public render() {
        return <div>
            <h1 style={{ textAlign: "center" }}>
                {this.props.title}
            </h1>
            <div style={this.getStyle()}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <ServerForm handleSubmit={this.onServerInputSubmit.bind(this)} />
                    <ServerViewSelect />
                </div>
                <List />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <LastUpdated />
                    <Legend />
                </div>
                <div>
                    <Storage />
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = (state: any) => {
    return {
        title: state.title
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        addServer,
        initialize
    }, dispatch);
};

export default connect<IDispatchProps, any, any>(mapStateToProps, mapDispatchToProps)(App);
