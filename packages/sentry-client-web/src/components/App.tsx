import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import List from "./List";
import LastUpdated from "./LastUpdated";
import Legend from "./Legend";
import DebugPanel from "./DebugPanel";
import GroupSelect from "./GroupSelect";
import ToggleControl from "./ToggleControl";

import { EView } from "../constants";

import { initialize, addServer, changeView } from "../actions";

interface IStateProps {
    title?: string;
    view?: EView;
}

interface IDispatchProps {
    initialize?: () => any;
    addServer?: (values: object) => any;
    changeView?: (view: EView) => void;
}

export class App extends React.Component<IStateProps & IDispatchProps, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            debug: false
        };

        document.addEventListener("keypress", (e) => {
            switch (e.key) {
                case "i":
                    this.setState({
                        debug: !this.state.debug
                    });
                    break;
            }
        });
    }

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

    public getStyle(): React.CSSProperties {
        return {
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto"
        };
    }

    public handleSelectChange(index: EView) {
        if (this.props.changeView) {
            this.props.changeView(index);
        }
    }

    public renderDebugPanel(): JSX.Element | null {
        if (this.state.debug === false) {
            return null;
        }

        return (
            <DebugPanel />
        );
    }

    public render() {

        const options = [];
        for (const option in EView) {
            options.push(EView[option]);
        }

        return (
            <div>
                <h1 style={{ textAlign: "center", fontWeight: 500 }}>
                    {this.props.title}
                </h1>
                <div style={this.getStyle()}>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <ToggleControl />
                        <GroupSelect
                            onChange={(index) => this.handleSelectChange(index)}
                            options={options}
                            selectedOption={this.props.view || EView.servers} />
                    </div>
                    <List />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <LastUpdated />
                        <Legend />
                    </div>
                </div>
                {this.renderDebugPanel()}
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

export default connect<IStateProps & IDispatchProps, any, any>(mapStateToProps, mapDispatchToProps)(App);
