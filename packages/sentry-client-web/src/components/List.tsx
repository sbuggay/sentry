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
        return Object.keys(this.props.servers).map((serverKey: string) => servers[serverKey]).reduce(
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

    public render() {
        const servers = this.props.servers;
        if (servers === undefined) {
            return;
        }

        let errorMessage;
        let displayEntities;
        let DisplayEntity;
        switch (this.props.view) {
            case EView.servers:
                DisplayEntity = Server;
                displayEntities = Object.values(servers);
                break;
            case EView.services:
                DisplayEntity = Service;
                displayEntities = this.getServices();
                break;
            default:
                throw new Error("Switch statement should be exhaustive");
        }

        if (displayEntities.length === 0) {
            return <MessageBox message={`No ${this.props.view}`} />;
        } else {
            return (
                <div style={this.getStyle()}>
                    {displayEntities.map((entity: any, index: number) => {
                        return (
                            <div>
                                <DisplayEntity
                                    key={index}
                                    index={index}
                                    data={entity} />
                            </div>
                        );
                    })}
                </div>
            );
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
