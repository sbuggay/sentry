import * as React from "react";

import Status from "./Status";
import { STATUS } from "../constants";

import { IService } from "../reducer";

interface IStateProps {
    service: IService;
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
        const status = this.props.service.status ? STATUS.AVAILABLE : STATUS.OUTAGE;
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
                        {this.props.service.name}
                    </span>
                </div>
            </div>
        );
    }
}

export default Service;
