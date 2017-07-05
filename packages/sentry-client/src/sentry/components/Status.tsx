import * as React from "react";

import { STATUS } from "../constants/status";

interface IStatusProps {
    status: STATUS;
}

export class Status extends React.Component<IStatusProps, any> {
    getStyle() {
        return {
            marginRight: "0.5em"
        }
    }

    render() {
        let className, color;
        
        switch (this.props.status) {
            case STATUS.OUTAGE:
                className = "fa fa-exclamation-triangle";
                color = { color: "#951A1D" };
                break;
            case STATUS.AVAILABLE:
                className = "fa fa-circle";
                color = { color: "#229926" };
                break;
            case STATUS.UNKNOWN:
                className = "fa fa-circle";
                color = { color: "gray" };
                break;
            case STATUS.ISSUE:
                className = "fa fa-exclamation-circle";
                color = { color: "#FEE032" };
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
