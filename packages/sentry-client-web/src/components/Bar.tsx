import * as React from "react";

interface IBarProps {
    percentage: number;
    text?: string;
    style?: React.CSSProperties;
    barStyle?: React.CSSProperties;
}

export class Bar extends React.Component<IBarProps, any> {

    public getStyle(): React.CSSProperties {
        return {
            width: "100%",
            height: "16px",
            boxSizing: "border-box",
            border: "1px solid gray",
            borderRadius: "1px",
            ...this.props.style
        };
    }

    public getBarStyle(): React.CSSProperties {
        return {
            width: `${this.props.percentage}%`,
            height: "100%",
            background: "#62C552",
            borderRadius: "1px",
            ...this.props.barStyle
        };
    }

    public getTextStyle(): React.CSSProperties {
        return {
            float: "right",
            fontSize: "12px",
            marginRight: "4px",
            clear: "both",
            lineHeight: this.getStyle().height
        };
    }

    public render(): JSX.Element | null {
        return (
            <div style={this.getStyle()}>
                <div style={this.getTextStyle()}>
                    {this.props.text ? this.props.text : null}
                </div>
                <div style={this.getBarStyle()}>
                </div>
            </div>
        );
    }
}

export default Bar;
