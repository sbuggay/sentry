import * as React from "react";
import { connect } from "react-redux";

import Server from "./Server";

import { initializePolling } from "../actions";

interface IServerListProps {
    servers?: {
        [id: string]: Object
    };
    initializePolling?: Function;
};

export class ServerList extends React.Component<IServerListProps, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.initializePolling();
    }

    render() {
        const divStyle = {
            display: "flex",
            flexFlow: "row wrap",
            width: "100%",
            margin: "1.5em 0 1.5em"
            // border: "1pxx solid black"
        };

        return (
            <div style={divStyle}>
                {Object.keys(this.props.servers).map((id, index) => {
                    return <Server index={index} key={index} server={this.props.servers[id]} />;
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        servers: state.app.servers
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        initializePolling: () => dispatch(initializePolling())
    };
};

export default connect<IServerListProps, any, any>(mapStateToProps, mapDispatchToProps)(ServerList);