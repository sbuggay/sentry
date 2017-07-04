import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Server from "./Server";
import { initializePolling, pollServers } from "../actions";
import { IServer } from "../reducer";

interface IServerListProps {
    servers?: {
        [id: string]: IServer
    };
    initializePolling?: Function;
    pollServers?: Function;
};

// TODO: Figure out what the actual type of a component ref is
interface IServerListState {
    refs: any[];
}

export class ServerList extends React.Component<IServerListProps, any> {

    componentWillMount() {
        this.props.initializePolling();
    }

    componentDidMount() {
        this.props.pollServers();
    }

    getStyle() {
        return {
            display: "flex",
            flexFlow: "row wrap",
            width: "100%",
            margin: "1.5em 0 1.5em"
        };
    }

    render() {
        return (
            <div style={this.getStyle()}>
                {Object.keys(this.props.servers).map((id, index) => {
                    return <Server
                        index={index}
                        key={index}
                        server={this.props.servers[id]} />;
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        servers: state.servers
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        initializePolling,
        pollServers
    }, dispatch);
};

export default connect<IServerListProps, any, any>(mapStateToProps, mapDispatchToProps)(ServerList);