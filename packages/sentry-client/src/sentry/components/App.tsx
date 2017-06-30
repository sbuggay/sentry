import * as React from "react";
import { connect } from "react-redux";

import ServerList from "./ServerList";
import ServerForm from "./ServerForm";
import ServerViewSelect from "./ServerViewSelect";
import Status from "./Status";
import LastUpdated from "./LastUpdated";
import Legend from "./Legend";

import { initialize, addServer } from "../actions";

import { guid } from "../lib/utils";

import { STATUS } from "../constants/status";

interface IDispatchProps {
    title?: string;
    initialize?: Function;
    addServer?: Function;
};

class App extends React.Component<IDispatchProps, any> {

    componentDidMount() {
        this.props.initialize();
    }

    onServerInputSubmit(values: Object) {
        this.props.addServer(values);
    }

    getStyle() {
        return {
            maxWidth: "900px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto"
        }
    }

    render() {
        return <div>
            <h1 style={{ textAlign: "center" }}>
                {this.props.title}
            </h1>
            <div style={this.getStyle()}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <ServerForm handleSubmit={this.onServerInputSubmit.bind(this)} />
                    <ServerViewSelect />
                </div>
                <ServerList />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <LastUpdated />
                    <Legend />
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = (state: any) => {
    return {
        title: state.app.title
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addServer: (values: any) => {
            dispatch(addServer(values.nameValue, values.hostValue, guid()));
        },
        initialize: () => dispatch(initialize())
    };
};

export default connect<IDispatchProps, any, any>(mapStateToProps, mapDispatchToProps)(App);