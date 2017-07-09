import * as React from "react";

import { STATUS } from "../constants";

interface IStatusProps {
    status: STATUS;
}

export class Status extends React.Component<IStatusProps, any> {
    public getStyle() {
        return {
            marginRight: "0.5em"
        };
    }

    public render() {
        let className;
        let color;

        switch (this.props.status) {
            case STATUS.OUTAGE:
                className = "fa fa-exclamation-triangle";
                color = { color: "#DF3E2D" };
                break;
            case STATUS.AVAILABLE:
                className = "fa fa-circle";
                color = { color: "#62C552" };
                break;
            case STATUS.UNKNOWN:
                className = "fa fa-circle";
                color = { color: "gray" };
                break;
            case STATUS.ISSUE:
                className = "fa fa-exclamation-circle";
                color = { color: "#fadf59" };
                break;
            case STATUS.MAINTENANCE:
                className = "fa fa-square";
                color = { color: "#1172C6" };
                break;
            default:
        }

        return <i className={className} style={{...this.getStyle(), ...color}} aria-hidden="true"></i>;
    }
}

export default Status;
