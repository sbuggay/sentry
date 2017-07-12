import * as React from "react";

import { IServer } from "../reducer";

import Status from "./Status";
import Bar from "./Bar";
import { STATUS } from "../constants";

import { formatBytes } from "../lib/utils";

import { pretty } from "../utils/prettyTime";

interface IStateProps {
    server: IServer;
    index: number;
    expanded?: boolean;
}

interface IDispatchProps {
    removeServer?: () => any;
}

export class Server extends React.Component<IStateProps & IDispatchProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            expanded: false,
            hover: false
        };
    }

    // Handlers
    public handleClick() {
        this.toggleExpand();
    }

    public handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        switch (e.key) {
            case "Enter":
                this.toggleExpand();
                break;
        }
    }

    public handleOnMouseEnter() {
        this.setState({
            hover: true
        });
    }

    public handleOnMouseLeave() {
        this.setState({
            hover: false
        });
    }

    public toggleExpand() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    public getStyle(): React.CSSProperties {
        return {
            width: "280px",
            padding: "5px 10px",
            borderBottom: "1px solid #adb0af"
        };
    }

    // Helper function to render a flex row with left/right spans
    public renderRow(label: string, data: string) {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", height: "20px" }}>
                <strong>{label}</strong>
                <span>{data}</span>
            </div>
        );
    }

    // Render
    public renderStatus(): JSX.Element {
        const status = this.props.server.status ? this.props.server.status : STATUS.UNKNOWN;
        return (
            <Status status={status} />
        );
    }

    public renderData(): JSX.Element | null {
        // const staticInfo = this.props.server.staticInfo;

        if (!this.props.server.dynamicInfo) {
            return null;
        }

        const dynamicInfo = this.props.server.dynamicInfo;

        const cpuModel = dynamicInfo.cpus[0].model.split("@")[0];
        // const cpuSpeed = dynamicInfo.cpus[0].model.split("@")[1];

        const renderCpuCores = () => {

            const bars = dynamicInfo.cpus.map((core: any, index: number) => {

                // Calulate total by summing up all the times
                let total = 0;
                for (const type in core.times) {
                    total += core.times[type];
                }

                // Calculate our used and percent
                const used = core.times.user + core.times.sys;
                const percent = (used * 100) / total;

                return (
                    <div style={{width: "100%", height: "20px", padding: "1px" }}>
                        <Bar
                            key={index}
                            style={{ width: "100%" }}
                            percentage={percent}
                            text={`${percent.toFixed(2)}%`} />
                    </div>
                );
            });

            return (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {bars}
                </div>
            );
        };

        return (
            <div style={{ marginTop: "0.5em" }}>
                {this.renderRow("hostname:", dynamicInfo.hostname)}
                {this.renderRow("host:", this.props.server.host)}
                {this.renderRow("uptime:", pretty(dynamicInfo.uptime, 2))}
                {this.renderRow("cpu:", cpuModel)}
                {renderCpuCores()}
                {this.renderRow("ram:", "")}
                <Bar
                    percentage={(dynamicInfo.freemem / dynamicInfo.totalmem) * 100}
                    text={`${formatBytes(dynamicInfo.freemem)} / ${formatBytes(dynamicInfo.totalmem)}`} />
            </div>
        );
    }

    public renderServiceData(): JSX.Element | null {
        const services = this.props.server.serviceInfo;

        if (!services) {
            return null;
        }

        const serviceKeys = Object.keys(services);

        return (
            <div style={{ marginTop: "0.5em" }}>
                {this.renderRow("services:", serviceKeys.length.toString())}
                {serviceKeys.map((key, index) => {
                    const status = services[key].status ? STATUS.AVAILABLE : STATUS.OUTAGE;
                    return (
                        <div key={index} style={{ height: "20px" }}>
                            <Status status={status} />
                            {services[key].name}
                        </div>
                    );
                })}
            </div>
        );
    }

    public renderDetails(): JSX.Element {
        function detailStyle() {
            return {
                fontSize: "14px",
                marginBottom: "10px"
            };
        }

        return (
            <div style={detailStyle()}>
                {this.renderData()}
                {this.renderServiceData()}
            </div>
        );
    }

    public renderChevron(): JSX.Element {
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

    public render(): JSX.Element {
        return (
            <div
                tabIndex={0}
                onFocus={() => this.handleOnMouseEnter()}
                onBlur={() => this.handleOnMouseLeave()}
                onMouseEnter={() => this.handleOnMouseEnter()}
                onMouseLeave={() => this.handleOnMouseLeave()}
                onKeyDown={(e) => this.handleKeyDown(e)}
                style={this.getStyle()}>
                <div>
                    <span>
                        {this.renderStatus()}
                        {this.props.server.name}
                    </span>
                    {this.state.hover ? this.renderChevron() : null}
                </div>
                {this.state.expanded ? this.renderDetails() : null}
            </div>
        );
    }
}

export default Server;
