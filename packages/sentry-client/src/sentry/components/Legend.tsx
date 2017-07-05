import * as React from "react";

import { Status } from "./Status";
import { STATUS } from "../constants/status";

export class Legend extends React.Component<any, any> {

    public getStyle() {
        return {
            fontSize: "14px",
            color: "#adb0af"
        };
    }

    public render(): JSX.Element {
        // TODO: Clean up this stupid style hack
        return (
            <div style={this.getStyle()}>
                <span><Status status={STATUS.AVAILABLE} /> Available</span>
                <span style={{marginLeft: "1em"}}><Status status={STATUS.OUTAGE} /> Outage</span>
                <span style={{marginLeft: "1em"}}><Status status={STATUS.ISSUE} /> Issue</span>
                <span style={{marginLeft: "1em"}}><Status status={STATUS.MAINTENANCE} /> Maintenance</span>
                <span style={{marginLeft: "1em"}}><Status status={STATUS.UNKNOWN} /> Unknown</span>
            </div>
        );
    }
}

export default Legend;
