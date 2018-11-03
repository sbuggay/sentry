import * as React from "react";

import { IServer } from "../../reducer";
import Status from "../Status";
import { EStatus } from "../../constants";

interface IStateProps {
	server: IServer;
	expanded?: boolean;
}

interface IDispatchProps {
	removeServer?: () => any;
}

export class Header extends React.Component<IStateProps & IDispatchProps, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			expanded: false,
			hover: false
		};
	}

	// Handlers
	public handleClick() {
		this.toggleExpand();
	}

	public handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		switch (e.key) {
			case "Enter":
				this.toggleExpand();
				break;
		}
	}

	public handleOnMouseEnter() {
		this.setState({
			hover: true
		});
	}

	public handleOnMouseLeave() {
		this.setState({
			hover: false
		});
	}

	public toggleExpand() {
		this.setState({
			expanded: !this.state.expanded
		});
	}

	public getStyle(): React.CSSProperties {
		return {
			width: "280px",
			padding: "5px 10px"
		};
	}

	// Render
	public renderStatus(): JSX.Element {
		const status = this.props.server.status ? this.props.server.status : EStatus.unknown;
		return (
			<Status status={status} />
		);
	}

	public renderChevron(): JSX.Element {
		const style: React.CSSProperties = {
			marginLeft: "10px",
			float: "right",
			cursor: "pointer"
		};

		const className = this.state.expanded ? "fa fa-chevron-down" : "fa fa-chevron-right";

		return (
			<i
				style={style}
				className={className}></i>
		);
	}

	public renderHeader(): JSX.Element {
		const style = {
			cursor: "pointer",
			borderBottom: "1px solid #adb0af",
			padding: "4px 0",
			display: "flex",
			justifyContent: "space-between"
		};

		return (
			<div onFocus={() => this.handleOnMouseEnter()}
				onBlur={() => this.handleOnMouseLeave()}
				onMouseEnter={() => this.handleOnMouseEnter()}
				onMouseLeave={() => this.handleOnMouseLeave()}
				onClick={() => this.handleClick()}
				style={style}>
				<span>
					{this.props.server.dynamicInfo ? this.props.server.dynamicInfo.hostname : this.props.server.name}
				</span>
				{this.renderStatus()}
				{/* {this.state.hover && this.props.server.status === EStatus.available ? this.renderChevron() : null} */}
			</div>
		);
	}

	public render(): JSX.Element {
		return (
			<div
				onKeyDown={(e) => this.handleKeyDown(e)}
				style={this.getStyle()}>
				{this.renderHeader()}
			</div>
		);
	}
}

export default Header;
