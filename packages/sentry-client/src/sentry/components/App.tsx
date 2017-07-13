import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import List from "./List";
// import ServerForm from "./ServerForm";
// import ServerViewSelect from "./ViewSelect";
import LastUpdated from "./LastUpdated";
import Legend from "./Legend";
import Storage from "./Storage";
import GroupSelect from "./GroupSelect";

import { view } from "../constants";

import { initialize, addServer, changeView } from "../actions";

interface IDispatchProps {
    title?: string;
    view?: number;
    initialize?: () => any;
    addServer?: (values: object) => any;
    changeView?: (view: number) => void;
}

export class App extends React.Component<IDispatchProps, any> {

    public componentWillMount() {
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
            marginLeft: "auto",
            marginRight: "auto"
        };
    }

    public handleSelectChange(index: number) {
        if (this.props.changeView) {
            this.props.changeView(index);
        }
    }

    public render() {

        const options = view;

        return (
            <div>
                <h1 style={{ textAlign: "center", fontWeight: 500 }}>
                    {this.props.title}
                </h1>
                <div style={this.getStyle()}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div></div>
                        <GroupSelect
                            onChange={(index) => this.handleSelectChange(index)}
                            options={options}
                            selectedIndex={this.props.view || 0} />
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
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        title: state.title,
        view: state.view
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        addServer,
        initialize,
        changeView
    }, dispatch);
};

export default connect<IDispatchProps, any, any>(mapStateToProps, mapDispatchToProps)(App);
