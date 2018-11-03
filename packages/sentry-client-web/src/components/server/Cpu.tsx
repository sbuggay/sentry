
import * as React from "react";
import { IServer } from "../../reducer";
import Bar from "../Bar";

interface IDataProps {
    server: IServer;
}

export default class Cpu extends React.Component<IDataProps, any> {


    public render() {
        const dynamicInfo = this.props.server.dynamicInfo;
        if (!dynamicInfo) return null;

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
                    style={{ height: "8px", flex: "0 49%", boxSizing: "border-box", marginBottom: "2px" }}
                    percentage={percent} />
            );
        });

        return (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                {bars}
            </div>
        );
    }
}