import * as React from "react";
import Status from "./Status";

import { removeServer } from "../actions";
import { connect } from "react-redux";

interface IStateProps {
    server: any;
    index: Number;
    selected?: Boolean;
};

interface IDispatchProps {
    removeServer?: Function;
};

export class Server extends React.Component<IStateProps & IDispatchProps, any> {
    constructor(props: any) {
        super(props);
        // this.style = this.getStyles();
    }

    getStyles() {
        return {
            width: "280px",
            padding: "5px 10px"
        };
    }

    getHoverStyle(selected: Boolean) {
        if (selected) {
            return {
                backgroundColor: "blue"
            }
        }
        else {
            return {};
        }
    }

    renderData(): JSX.Element {
        if (!this.props.server.data) {
            return undefined;
        }
        return (
            <span>({this.props.server.data.dynamicInfo.hostname} {this.props.server.data.staticInfo.arch})</span>
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
                {serviceKeys.map((key, index) => {
                    return (
                        <div key={index}>
                            <Status status={services[key].status}/>
                            {services[key].name}
                        </div>
                    )
                })}
            </div>
        );
    }

    render() {
        return (
            <div 
            style={this.getStyles()}>
                <div>
                    <Status status={this.props.server.status} />
                    {this.props.server.name}
                </div>
                {this.renderData()}
                {this.renderServiceData()}
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
