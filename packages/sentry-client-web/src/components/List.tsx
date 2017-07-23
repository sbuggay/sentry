import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Server from "./Server";
import Service from "./Service";
import MessageBox from "./MessageBox";

import { initializePolling, pollServers } from "../actions";
import { IServer } from "../reducer";

import { EView } from "../constants";

interface IListProps {
    view?: EView;
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
            width: "100%",
            margin: "1.5em 0 1.5em"
        };
    }

    public renderServers(): JSX.Element {
        if (this.props.servers && Object.keys(this.props.servers).length > 0) {
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
        } else {
            const style = {
                width: "100%",
                height: "300px"
            };
            return (
                <MessageBox message={"No servers"} style={style} />
            );
        }
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
            case EView.servers:
                return this.renderServers();
            case EView.services:
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
