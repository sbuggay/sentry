import * as React from "react";

export class GroupSelect extends React.Component<any, any> {

    public getStyle(): React.CSSProperties {
        return {
            width: "100%",
            height: "16px",
            boxSizing: "border-box",
            border: "1px solid gray",
            ...this.props.style
        };
    }

    public render(): JSX.Element | null {
        return (
            <div>

            </div>
        );
    }
}

export default GroupSelect;
