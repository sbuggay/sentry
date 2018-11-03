
import * as React from "react";
import { IServer } from "../../reducer";
import Bar from "../Bar";
import { renderRow } from "./Rows";
import { formatBytes } from "../../lib/utils";

interface IDataProps {
	server: IServer;
}

export default class Ram extends React.Component<IDataProps, any> {

	public render() {
		const dynamicInfo = this.props.server.dynamicInfo;
		if (!dynamicInfo) {
			return null;
		}

		const percentage = (dynamicInfo.freemem / dynamicInfo.totalmem) * 100;
		return (<div>
			{renderRow("ram", "")}
			<Bar
				barStyle={percentage > 50 ? { right: "auto", left: "4px", color: "black" } : {}}
				percentage={percentage}
				text={`${formatBytes(dynamicInfo.freemem)} / ${formatBytes(dynamicInfo.totalmem)} (${Math.floor(percentage)}%)`} />
		</div>);
	}
}
