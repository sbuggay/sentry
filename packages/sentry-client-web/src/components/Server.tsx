import * as React from "react";

import { IServer } from "../reducer";

import Status from "./Status";
import Bar from "./Bar";
import { EStatus } from "../constants";

import { formatBytes } from "../lib/utils";

import { pretty } from "../utils/prettyTime";
import osmapping from "../utils/osmapping";

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
        const status = this.props.server.status ? this.props.server.status : EStatus.unknown;
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
        const cpuCores = dynamicInfo.cpus.length;
        const cpuSpeed = dynamicInfo.cpus[0].model.split("@")[1];

        function renderCpuCores() {
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
                    <Bar
                        key={index}
                        style={{ height: "8px", flex: "0 50%", boxSizing: "border-box" }}
                        percentage={percent} />
                );
            });

            return (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {bars}
                </div>
            );
        }

        return (
            <div style={{ marginTop: "0.5em" }}>
                {this.renderRow("hostname:", dynamicInfo.hostname)}
                {this.renderRow("host:", this.props.server.host)}
                {this.renderRow("uptime:", pretty(dynamicInfo.uptime, 2))}
                {this.renderRow("cpu:", cpuModel)}
                {this.renderRow("", `${cpuCores} core${cpuCores === 1 ? "" : "s"} @ ${cpuSpeed}`)}
                {renderCpuCores()}
                {this.renderRow("ram:", "")}
                <Bar
                    percentage={(dynamicInfo.freemem / dynamicInfo.totalmem) * 100}
                    text={`${formatBytes(dynamicInfo.freemem)} / ${formatBytes(dynamicInfo.totalmem)}`} />
            </div>
        );
    }

    public renderServiceData(): JSX.Element | null {

        function getServiceDataStyle(): React.CSSProperties {
            return {
                marginTop: "0.5em"
            };
        }

        const services = this.props.server.serviceInfo;

        if (!services) {
            return null;
        }

        const serviceKeys = Object.keys(services);

        return (
            <div style={getServiceDataStyle()}>
                {this.renderRow("services:", serviceKeys.length.toString())}
                {serviceKeys.map((key, index) => {
                    const status = services[key].status ? EStatus.available : EStatus.outage;
                    return (
                        <div
                            key={index}
                            style={{ height: "20px" }}>
                            <Status status={status} />
                            {services[key].name}
                        </div>
                    );
                })}
            </div>
        );
    }

    public renderDetails(): JSX.Element {
        const expanded = this.props.expanded;
        function getDetailStyle() {
            if (expanded) {
                return {
                    overflowY: "hidden",
                    transitionProperty: "all",
                    transitionDuration: ".5s",
                    transitionTimingFunction: "cubic-bezier(0, 1, 0.5, 1)",
                }
            }
            else {
                return {
                    maxHeight: 0
                }
            }
        }

        return (
            <div style={getDetailStyle()}>
                {this.renderData()}
                {this.renderServiceData()}
            </div>
        );
    }

    public renderChevron(): JSX.Element {
        const style: React.CSSProperties = {
            marginLeft: "10px",
            float: "right",
            cursor: "pointer"
        };

        const className = this.state.expanded ? "fa fa-chevron-down" : "fa fa-chevron-right";

        return (
            <i
                onClick={() => this.handleClick()}
                style={style}
                className={className}></i>
        );
    }

    public renderOs(): JSX.Element | null {
        if (!this.props.server.os) return null;
        return <span className={`fo-${osmapping(this.props.server.os)}`}></span>;
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
                        {this.renderOs()}
                    </span>
                    {this.state.hover && this.props.server.status === EStatus.available ? this.renderChevron() : null}
                </div>
                {this.state.expanded ? this.renderDetails() : null}
            </div>
        );
    }
}

export default Server;
