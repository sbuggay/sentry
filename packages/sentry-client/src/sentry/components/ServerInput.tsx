import * as React from "react";
import { Field, reduxForm } from "redux-form";

interface IStateProps {
	handleSubmit: any;
}

export class ServerInput extends React.Component<IStateProps, any> {
	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit}>
				<Field name="hostname" component="input" type="text" />
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default reduxForm({ form: "hostnameInput" })(ServerInput);