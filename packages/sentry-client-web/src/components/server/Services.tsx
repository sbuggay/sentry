import * as React from "react";

import Status from "../Status";
import { EStatus } from "../../constants";

import { renderRow } from "./Details";

export default class Services extends React.Component<any, any> {
    public render() {

        function getServiceDataStyle(): React.CSSProperties {
            return {
                marginTop: "0.5em"
            };
        }

        const services = this.props.services;

        if (!services) {
            return null;
        }

        function getServices() {
            return Object.keys(services).map((key, index) => {
                const status = services[key].status ? EStatus.available : EStatus.outage;
                return (
                    <div
                        key={index}
                        style={{ height: "20px" }}>
                        <Status status={status} />
                        {services[key].name}
                    </div>
                );
            });
        }

        return (
            <div style={getServiceDataStyle()}>
                {renderRow("services:", Object.keys(services).length.toString())}
                {getServices()}
            </div>
        );
    }
}