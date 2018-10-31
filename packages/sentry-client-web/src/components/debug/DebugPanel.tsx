import * as React from "react";

import Storage from "./Storage";

// interface IDebugPanelProps {

// }

export class DebugPanel extends React.Component<any, any> {

    public getStyle(): React.CSSProperties {
        return {
            width: "200px",
            height: "300px",
            border: "1px solid black",
            padding: "8px",
            position: "absolute",
            left: "20px",
            top: "20px",
            backgroundColor: "#ccc",
            opacity: 0.7
        };
    }

    public render(): JSX.Element | null {
        return (
            <div style={this.getStyle()}>
                <h3>Debug</h3>
                <Storage />
            </div>
        );
    }
}

export default DebugPanel;
