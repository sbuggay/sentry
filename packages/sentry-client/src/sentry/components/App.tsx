import * as React from "react";
import { connect } from "react-redux";

import ServerList from "./ServerList";
import ServerForm from "./ServerForm";
import ServerViewSelect from "./ServerViewSelect";
import Status from "./Status";

import { addServer } from "../actions";

import { guid } from "../lib/utils";

import { STATUS } from "../constants/status";

interface IDispatchProps {
    addServer?: Function;
};

class App extends React.Component<IDispatchProps, any> {
    onServerInputSubmit(values: Object) {
        this.props.addServer(values);
    }

    render() {
        return <div>
            <h1 style={{textAlign: "center"}}>
                System Status
            </h1>
            <div style={{display: "flex", marginRight: "auto", marginLeft: "auto"}}>
            <ServerForm handleSubmit={this.onServerInputSubmit.bind(this)} />
            <ServerViewSelect />
            </div>
            <ServerList />
        </div>;
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addServer: (values: any) => {
            dispatch(addServer(values.nameValue, values.hostValue, guid()));
        }
    };
};

export default connect<any, IDispatchProps, any>(undefined, mapDispatchToProps)(App);