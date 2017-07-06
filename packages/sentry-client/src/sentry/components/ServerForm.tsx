import * as React from "react";

interface IServerFormProps {
    handleSubmit?: (state: IServerFormState) => any;
    onSubmit?: () => any;
}

interface IServerFormState {
    nameValue?: string;
    hostValue?: string;
}

export default class ServerForm extends React.Component<IServerFormProps & IServerFormState, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            nameValue: "",
            hostValue: ""
        };
    }

    public handleChange(event: any) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    public handleSubmit(event: any) {
        if (this.props.handleSubmit) {
            this.props.handleSubmit(this.state);
        }
        event.preventDefault();
    }

    public render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input
                    placeholder="name"
                    type="text"
                    name="nameValue"
                    value={this.state.nameValue}
                    onChange={this.handleChange.bind(this)}>
                </input>
                <input
                    placeholder="host"
                    type="text"
                    name="hostValue"
                    value={this.state.hostValue}
                    onChange={this.handleChange.bind(this)}>
                </input>
                <button type="submit">submit</button>
            </form>
        );
    }
}
