import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Service from "./Service";
import MessageBox from "./MessageBox";

import { initializePolling, pollServers } from "../actions";
import { IServer } from "../reducer";

import { EView } from "../constants";
import Cpu from "./server/Cpu";
import Ram from "./server/Ram";
import Data from "./server/Data";
import Services from "./server/Services";
import Header from "./server/Header";

interface IListProps {
	view?: EView;
	loading?: boolean;
	servers?: {
		[id: string]: IServer
	};
	initializePolling?: () => any;
	pollServers?: () => any;
}

// TODO: Figure out what the actual type of a component ref is
interface IListState {
	expanded: any;
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
		const servers = this.props.servers;
		if (servers && Object.keys(servers).length > 0) {
			const binStyle = {
				width: "280px",
				padding: "5px 10px",
				fontSize: "14px"
			};

			const headerBin: JSX.Element[] = [];
			const detailBin: JSX.Element[] = [];
			const cpuBin: JSX.Element[] = [];
			const ramBin: JSX.Element[] = [];
			const serviceBin: JSX.Element[] = [];

			Object.keys(servers).forEach((id, index) => {
				const server = servers[id];
				headerBin.push(<div><Header server={server} /></div>);
				detailBin.push(<div style={binStyle}><Data server={server} /></div>);
				cpuBin.push(<div style={binStyle}><Cpu server={server} /></div>);
				ramBin.push(<div style={binStyle}><Ram server={server} /></div>);
				serviceBin.push(<div style={binStyle}><Services services={server.serviceInfo} /></div>);
			});
			return (
				<div style={this.getStyle()}>
					{headerBin}
					{detailBin}
					{cpuBin}
					{ramBin}
					{serviceBin}
				</div>
			);
		} else {
			const style = {
				width: "100%",
				height: "300px"
			};
			if (this.props.loading) {
				return <MessageBox message={"Loading..."} style={style} />;
			} else {
				return <MessageBox message={"No servers"} style={style} />;
			}
		}
	}

	public renderServices(): JSX.Element | null {
		const services = this.getServices();
		if (services === undefined) {
			return null;
		}

		if (services.length > 0) {
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
		} else {
			const style = {
				width: "100%",
				height: "300px"
			};
			if (this.props.loading) {
				return <MessageBox message={"Loading..."} style={style} />;
			} else {
				return <MessageBox message={"No servers"} style={style} />;
			}
		}
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
		loading: state.loading,
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
