import * as React from "react";

import Status from "./Status";
import { EStatus } from "../constants";

import { IService } from "../reducer";

interface IStateProps {
    data: IService;
}

export class Service extends React.Component<IStateProps, any> {

    public getStyle(): React.CSSProperties {
        return {
            width: "280px",
            padding: "5px 10px",
            borderBottom: "1px solid #adb0af"
        };
    }

    // Render
    public renderStatus(): JSX.Element {
        const status = this.props.data.status ? EStatus.available : EStatus.outage;
        return (
            <Status status={status} />
        );
    }

    public render(): JSX.Element {
        return (
            <div
                style={this.getStyle()}>
                <div>
                    <span>
                        {this.renderStatus()}
                        {this.props.data.name}
                    </span>
                </div>
            </div>
        );
    }
}

export default Service;
