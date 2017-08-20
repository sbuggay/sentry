import * as React from "react";

// import { EView } from "../constants";

interface IGroupSelectProps {
    options: string[];
    selectedOption: any;
    onChange?: (option: any) => void;
}

export class GroupSelect extends React.Component<IGroupSelectProps, any> {

    public getStyle(): React.CSSProperties {
        return {
            fontSize: "14px"
        };
    }

    public getOptionStyle(): React.CSSProperties {
        return {
            display: "inline",
            padding: "2px 8px",
            boxSizing: "border-box",
            border: "1px solid gray"
        };
    }

    public getSelectedOptionStyle(): React.CSSProperties {
        return {
            color: "white",
            backgroundColor: "#3595FD"
        };
    }

    public updateSelected(option: any) {
        if (this.props.onChange) {
            this.props.onChange(option);
        }
    }

    public handleSelect(option: any) {
        this.updateSelected(option);
    }
    public handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>, option: any) {
        switch (e.key) {
            case "Enter":
                this.updateSelected(option);
                break;
        }
    }

    public render(): JSX.Element | null {

        const options = this.props.options.map((option, index) => {

            // Get style for some conditional settings
            let style = this.getOptionStyle();

            // Special styling for first and last elements of the group
            if (index === 0) {
                style = {
                    ...style,
                    borderRight: 0,
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px"
                };
            } else if (index === (this.props.options.length - 1)) {
                style = {
                    ...style,
                    borderLeft: 0,
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px"
                };
            }

            // Special styling for the selected and non-selected elements of the group
            if (option === this.props.selectedOption) {
                style = {
                    ...style,
                    ...this.getSelectedOptionStyle()
                };
            } else {
                style = {
                    ...style,
                    cursor: "pointer"
                };
            }

            return (
                <div
                    key={index}
                    onKeyDown={(e) => this.handleKeyDown(e, option)}
                    onClick={() => this.handleSelect(option)}
                    style={style}>
                    {option}
                </div>
            );

        });

        return (
            <div style={this.getStyle()}>
                {options}
            </div>
        );
    }
}

export default GroupSelect;
