import * as React from "react";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { changeView } from "../actions";
import { IView, view } from "../constants";

import { IState } from "../reducer";

interface IViewSelectProps {
    view: IView;
    changeView?: (view: IView) => any;
}

export class ViewSelect extends React.Component<IViewSelectProps, any> {

    public handleChange(view: any) {
        if (view === undefined) {
            return;
        }

        if (this.props.changeView) {
            this.props.changeView(view);
        }
    }

    public render() {
        const options = Object.keys(view).map((key: string, index) => {
            return (
                <option
                    key={index}
                    value={key}>
                    {view[key]}
                </option>
            );
        });

        return (
            <div>
                <select onChange={(e) => this.handleChange(e.target.value)}>
                    {options}
                </select>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        view: state.view
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IState>) => {
    return bindActionCreators({
        changeView
    }, dispatch);
};

export default connect<IViewSelectProps, any, any>(mapStateToProps, mapDispatchToProps)(ViewSelect);
