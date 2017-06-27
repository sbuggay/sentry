import * as React from "react";

import { STATUS } from "../constants/status";

interface IStatusProps {
    status: any;
}

export class Status extends React.Component<IStatusProps, any> {
    getStyle() {
        return {
            marginRight: "10px"
        }
    }

    render() {
        let className, color;
        
        switch (this.props.status) {
            case STATUS.AVAILABLE:
                className = "fa fa-circle";
                color = { color: "#229926" };
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
            case STATUS.OUTAGE:
                className = "fa fa-exclamation-triangle";
                color = { color: "#951A1D" };
                break;
        }

        return <i className={className} style={{...this.getStyle, color}} aria-hidden="true"></i>;
    }
}

export default Status;
