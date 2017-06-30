import * as React from "react";
import Status from "./Status";

import { STATUS } from "../constants/status";

import { removeServer } from "../actions";
import { connect } from "react-redux";

interface IStateProps {
    server: any;
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
            expanded: false
        }
    }

    toggleExpand() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    handleClick() {
        this.toggleExpand()
    }

    handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        switch (e.key) {
            case "Enter":
                this.toggleExpand();
                break;
        }
    }

    getStyles(): React.CSSProperties{
        return {
            width: "280px",
            padding: "5px 10px",
            borderBottom: "1px solid #adb0af",
            alignSelf: "flex-start"
        };
    }

    formatBytes(bytes: number): string {
        if (bytes < 1024) return bytes + "B";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + "KB";
        else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) +  "MB";
        else return (bytes / 1073741824).toFixed(1) + "GB";
    };

    renderData(): JSX.Element {
        const staticInfo = this.props.server.data.staticInfo;
        const dynamicInfo = this.props.server.data.dynamicInfo;

        const cpu = dynamicInfo.cpus[0].model;

        const renderRow = (label: string, data: string) => {
            return (
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <span>{label}</span>
                    <span>{data}</span>
                </div>
            );
        }

        return (
            <div style={{marginTop: "0.5em", overflow: "hidden"}}>
                {renderRow("hostname:", dynamicInfo.hostname)}
                {renderRow("uptime:", dynamicInfo.uptime)}
                {/*{renderRow("cpu:", cpu)}*/}
                {renderRow("ram:", `${this.formatBytes(dynamicInfo.freemem)} / ${this.formatBytes(dynamicInfo.totalmem)}`)}
            </div>
        );
    }

    renderServiceData(): JSX.Element {
        const services = this.props.server.data.serviceInfo;
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
        if (!this.props.server.data) {
            return undefined;
        }

        function detailStyle() {
            return {
                fontSize: "14px"
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
        if (!this.props.server.data) {
            return undefined;
        }

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
                onKeyDown={(e) => this.handleKeyDown(e)}
                style={this.getStyles()}>
                <div>
                    <span>
                        <Status status={this.props.server.status} />
                        {this.props.server.name}
                    </span>
                    {this.renderChevron()}
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
