import * as React from "react";
import { removeServer } from "../actions";
import { connect } from "react-redux";

import { IServer } from "../reducer";

import Status from "./Status";
import { STATUS } from "../constants/status";

import { formatBytes } from "../lib/utils";

interface IStateProps {
    server: IServer;
    index: Number;
    expanded?: Boolean;
};

interface IDispatchProps {
    removeServer?: Function;
};

export class Server extends React.Component<IStateProps & IDispatchProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            expanded: false,
            hover: false
        }
    }

    //Handlers
    handleClick() {
        this.toggleExpand();
    }

    handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        switch (e.key) {
            case "Enter":
                this.toggleExpand();
                break;
        }
    }

    handleOnMouseEnter() {
        this.setState({
            hover: true
        });
    }

    handleOnMouseLeave() {
        this.setState({
            hover: false
        });
    }

    toggleExpand() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    getStyle(): React.CSSProperties{
        return {
            width: "280px",
            padding: "5px 10px",
            borderBottom: "1px solid #adb0af"
        };
    }

    //Render
    renderData(): JSX.Element {
        const staticInfo = this.props.server.staticInfo;
        const dynamicInfo = this.props.server.dynamicInfo;

        const cpu = dynamicInfo.cpus[0].model;

        const renderRow = (label: string, data: string) => {
            return (
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <span>{label}</span>
                    <span>{data}</span>
                </div>
            );
        }

        const cpuModel = dynamicInfo.cpus[0].model.split("@")[0];
        const cpuSpeed = dynamicInfo.cpus[0].model.split("@")[1];
        const virtualCores = dynamicInfo.cpus.length;

        return (
            <div style={{marginTop: "0.5em", overflow: "hidden"}}>
                {renderRow("hostname:", dynamicInfo.hostname)}
                {renderRow("uptime:", dynamicInfo.uptime.toString())}
                {renderRow("cpu:", cpuModel)}
                {renderRow("", `${cpuSpeed} (${virtualCores})`)}
                {renderRow("ram:", `${formatBytes(dynamicInfo.freemem)} / ${formatBytes(dynamicInfo.totalmem)}`)}
            </div>
        );
    }

    renderServiceData(): JSX.Element {
        const services = this.props.server.serviceInfo;

        if (!services) {
            return null;
        }

        const serviceKeys = Object.keys(services);

        return (
            <div style={{marginTop: "0.5em"}}>
                <div>services:</div>
                {serviceKeys.map((key, index) => {
                    const status = services[key].status ? STATUS.AVAILABLE : STATUS.OUTAGE;
                    return (
                        <div key={index}>
                            <Status status={status} />
                            {services[key].name}
                        </div>
                    )
                })}
            </div>
        );
    }

    renderDetails(): JSX.Element {

        function detailStyle() {
            return {
                fontSize: "14px",
                marginBottom: "10px"
            }
        }

        return (
            <div style={detailStyle()}>
                {this.renderData()}
                {this.renderServiceData()}
            </div>
        );
    }

    renderChevron(): JSX.Element {

        const style = {
            marginLeft: "10px",
            float: "right"
        };

        const className = this.state.expanded ? "fa fa-chevron-down" : "fa fa-chevron-right";

        return (
            <i 
            onClick={() => this.handleClick()}
            style={style} 
            className={className}></i>
        );
    }

    render(): JSX.Element {
        return (
            <div
                tabIndex={0}
                onMouseEnter={() => this.handleOnMouseEnter()}
                onMouseLeave={() => this.handleOnMouseLeave()}
                onKeyDown={(e) => this.handleKeyDown(e)}
                style={this.getStyle()}>
                <div>
                    <span>
                        <Status status={this.props.server.status} />
                        {this.props.server.name}
                    </span>
                    {this.state.hover ? this.renderChevron() : null}
                </div>
                {this.state.expanded ? this.renderDetails() : null}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        removeServer: () => dispatch(removeServer)
    };
};

export default connect<IStateProps, IDispatchProps, any>(undefined, mapDispatchToProps)(Server);
