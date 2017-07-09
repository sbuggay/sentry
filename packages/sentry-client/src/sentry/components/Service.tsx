import * as React from "react";

import Status from "./Status";
import { STATUS } from "../constants";

interface IStateProps {
    service: any;
    index: number;
    expanded?: boolean;
}

export class Service extends React.Component<IStateProps, any> {
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

    // Render
    public renderStatus(): JSX.Element {
        const status = this.props.service.status ? STATUS.AVAILABLE : STATUS.OUTAGE;
        return (
            <Status status={status} />
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
                        {this.props.service.name}
                    </span>
                </div>
            </div>
        );
    }
}

export default Service;
