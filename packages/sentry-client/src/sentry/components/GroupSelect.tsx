import * as React from "react";

interface IGroupSelectProps {
    options: string[];
    selectedIndex: number;
    onChange?: (index: number) => void;
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

    public updateSelected(index: number) {
        if (this.props.onChange) {
            this.props.onChange(index);
        }
    }

    public handleSelect(index: number) {
        this.updateSelected(index);
    }
    public handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>, index: number) {
        switch (e.key) {
            case "ArrowRight":
                if (this.props.onChange) {
                    this.props.onChange(index + 1);
                }
                break;
            case "ArrowLeft":
                if (this.props.onChange) {
                    this.props.onChange(index - 1);
                }
                break;
            case "Enter":
                this.updateSelected(index);
                break;
        }
    }

    public render(): JSX.Element | null {
        const options = this.props.options.map((option, index) => {

            let style = this.getOptionStyle();

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

            if (index === this.props.selectedIndex) {
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
                    tabIndex={0}
                    onKeyDown={(e) => this.handleKeyDown(e, index)}
                    onClick={() => this.handleSelect(index)}
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
