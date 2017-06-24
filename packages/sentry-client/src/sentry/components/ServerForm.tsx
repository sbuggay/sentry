import * as React from "react";

interface IProps {
	handleSubmit?: Function;
	onSubmit?: Function;
};

export default class ServerForm extends React.Component<IProps, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			nameValue: "",
			hostValue: ""
		}
	}

	handleChange(event: any) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ [name]: target.value });
	}

	handleSubmit(event: any) {
		this.props.handleSubmit(this.state);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<input placeholder="name" type="text" name="nameValue" value={this.state.nameValue} onChange={this.handleChange.bind(this)}></input>
				<input placeholder="host" type="text" name="hostValue" value={this.state.hostValue} onChange={this.handleChange.bind(this)}></input>
				<button type="submit">submit</button>
			</form>
		);
	}
};
