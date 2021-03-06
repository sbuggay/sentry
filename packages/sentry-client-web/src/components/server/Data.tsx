import * as React from "react";

import { renderRow, renderRowSpan } from "./Rows";
import { pretty } from "../../utils/prettyTime";
import { IServer } from "../../reducer";
import osmapping from "../../utils/osmapping";

interface IDataProps {
	server: IServer;
}

export default class Data extends React.Component<IDataProps, any> {
	public render() {
		const os = this.props.server.os;
		const staticInfo = this.props.server.staticInfo;
		const dynamicInfo = this.props.server.dynamicInfo;

		if (!staticInfo || !dynamicInfo) {
			return null;
		}

		const cpuModel = dynamicInfo.cpus[0].model.split("@")[0];
		const cpuCores = dynamicInfo.cpus.length;
		const cpuSpeed = dynamicInfo.cpus[0].model.split("@")[1];

		const loadAvg = dynamicInfo.loadavg.map((load) => load.toFixed(2));
		const loadAvgStr = `[${loadAvg.join(", ")}]`;

		function renderOs(): JSX.Element | null {
			if (!os || !staticInfo) {
				return null;
			}

			const str = ` ${staticInfo.type}`;
			return renderRowSpan("platform", <span><span className={`fo-${osmapping(os)}`}></span>{str}</span>);
		}

		return (
			<div style={{ marginTop: "0.5em" }}>
				{renderRow("hostname", dynamicInfo.hostname)}
				{renderRow("host", this.props.server.host)}
				{renderOs()}
				{renderRow("uptime", pretty(dynamicInfo.uptime, 2))}
				{renderRowSpan("cpu", <span>{cpuModel.replace(/\(TM\)/g, "™").replace(/\(R\)/g, "®")}</span>)}
				{renderRow("", `${cpuCores} core${cpuCores === 1 ? "" : "s"} @ ${cpuSpeed} ${loadAvgStr}`)}
			</div>
		);
	}
}
