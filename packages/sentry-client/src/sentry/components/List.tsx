import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Server from "./Server";
import Service from "./Service";

import { initializePolling, pollServers } from "../actions";
import { IServer } from "../reducer";

interface IListProps {
    view?: number;
    servers?: {
        [id: string]: IServer
    };
    initializePolling?: () => any;
    pollServers?: () => any;
}

// TODO: Figure out what the actual type of a component ref is
interface IListState {
    refs: any[];
}

export class List extends React.Component<IListProps, IListState> {

    public componentWillMount() {
        if (this.props.pollServers) {
            this.props.pollServers();
        }
        if (this.props.initializePolling) {
            this.props.initializePolling();
        }
    }

    public getServices() {
        const servers = this.props.servers;
        if (servers === undefined) {
            return;
        }

        return Object.keys(servers).map((serverKey: string) => servers[serverKey]).reduce(
            (prev, current: IServer) => current.serviceInfo ?
                prev.concat(Object.keys(current.serviceInfo)
                    .map((serviceKey: string) => current.serviceInfo && current.serviceInfo[serviceKey]))
                : prev, [] as any[]);
    }

    public getStyle(): React.CSSProperties {
        return {
            display: "flex",
            flexFlow: "row wrap",
            // justifyContent: "center",
            width: "100%",
            margin: "1.5em 0 1.5em"
        };
    }

    public renderServers(): JSX.Element {
        return (
            <div style={this.getStyle()}>
                {Object.keys(this.props.servers).map((id, index) => {
                    if (!this.props.servers || !this.props.servers[id]) {
                        return null;
                    }

                    return <Server
                        index={index}
                        key={index}
                        server={this.props.servers[id]} />;
                })}
            </div>
        );
    }

    public renderServices(): JSX.Element | null {
        const services = this.getServices();
        if (services === undefined) {
            return null;
        }

        return (
            <div style={this.getStyle()}>
                {services.map((service: any, index: number) => {
                    return (
                        <div>
                            <Service
                                key={index}
                                service={service} />
                        </div>
                    );
                })}
            </div>
        );

    }

    public render() {
        switch (this.props.view) {
            case 0:
                return this.renderServers();
            case 1:
                return this.renderServices();
            default:
                return null;
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        view: state.view,
        servers: state.servers
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        pollServers,
        initializePolling
    }, dispatch);
};

export default connect<IListProps, any, any>(mapStateToProps, mapDispatchToProps)(List);
