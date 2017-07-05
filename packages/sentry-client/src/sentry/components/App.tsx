import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ServerList from "./ServerList";
import ServerForm from "./ServerForm";
import ServerViewSelect from "./ViewSelect";
import LastUpdated from "./LastUpdated";
import Legend from "./Legend";
import Storage from "./Storage";

import { initialize, addServer } from "../actions";

interface IDispatchProps {
    title?: string;
    initialize?: Function;
    addServer?: Function;
};

export class App extends React.Component<IDispatchProps, any> {

    componentDidMount() {
        if (this.props.initialize)
            this.props.initialize();
    }

    onServerInputSubmit(values: Object) {
        if (this.props.addServer)
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
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        addServer,
        initialize
    }, dispatch);
};

export default connect<IDispatchProps, any, any>(mapStateToProps, mapDispatchToProps)(App);