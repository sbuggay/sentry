import * as React from "react";

import { Status } from "./Status";
import { EStatus } from "../constants";

export class Legend extends React.Component<any, any> {

    public getStyle() {
        return {
            fontSize: "14px"
        };
    }

    public render(): JSX.Element {
        // TODO: Clean up this stupid style hack
        return (
            <div style={this.getStyle()}>
                <span><Status status={EStatus.available} /> Available</span>
                <span style={{marginLeft: "1em"}}><Status status={EStatus.outage} /> Outage</span>
                <span style={{marginLeft: "1em"}}><Status status={EStatus.issue} /> Issue</span>
                <span style={{marginLeft: "1em"}}><Status status={EStatus.maintenence} /> Maintenance</span>
                <span style={{marginLeft: "1em"}}><Status status={EStatus.unknown} /> Unknown</span>
            </div>
        );
    }
}

export default Legend;
