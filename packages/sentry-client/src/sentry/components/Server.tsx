import * as React from "react";
import Status from "./Status";

import { removeServer } from "../actions";
import { connect } from "react-redux";

interface IStateProps {
    server: any;
    index: Number;
    expanded?: Boolean;
};

interface IDispatchProps {
    removeServer?: Function;
};

export class Server extends React.Component<IStateProps & IDispatchProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    handleClick() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    getStyles() {
        return {
            width: "280px",
            padding: "5px 10px"
        };
    }

    formatBytes(bytes: number) {
        if (bytes < 1024) return bytes + " Bytes";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KB";
        else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MB";
        else return (bytes / 1073741824).toFixed(3) + " GB";
    };

    renderData(): JSX.Element {
        if (!this.props.server.data) {
            return undefined;
        }

        const staticInfo = this.props.server.data.staticInfo;
        const dynamicInfo = this.props.server.data.dynamicInfo;
        return (
            <div>
                <div>{dynamicInfo.hostname}</div>
                <div>{this.formatBytes(dynamicInfo.freemem)} / {this.formatBytes(dynamicInfo.totalmem)}</div>
            </div>
        );
    }

    renderServiceData(): JSX.Element {
        if (!this.props.server.data) {
            return undefined;
        }

        const services = this.props.server.data.serviceInfo;
        const serviceKeys = Object.keys(services);

        return (
            <div>
                <i>Services</i>
                {serviceKeys.map((key, index) => {
                    return (
                        <div key={index}>
                            <Status status={services[key].status} />
                            {services[key].name}
                        </div>
                    )
                })}
            </div>
        );
    }

    renderDetails() {
        return (
            <div>
                {this.renderData()}
                {this.renderServiceData()}
            </div>
        );
    }

    renderChevron() {
        const style = {
            marginLeft: "10px",
            float: "right"
        };

        const className = this.state.expanded ? "fa fa-chevron-down" : "fa fa-chevron-right";

        return (
            <i style={style} className={className}></i>
        );
    }

    render() {
        return (
            <div
                tabIndex={0}
                onClick={() => this.handleClick()}
                onKeyDown={() => this.handleClick()}
                style={this.getStyles()}>
                <div>
                    <span>
                        <Status status={this.props.server.status} />
                        {this.props.server.name}
                    </span>
                    {this.renderChevron()}
                </div>
                {this.state.expanded ? this.renderDetails() : null}
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch: Function) => {
    return {
        removeServer: () => dispatch(removeServer)
    };
};

export default connect<IStateProps, IDispatchProps, any>(undefined, mapDispatchToProps)(Server);
