import * as React from "react";
import { Field, reduxForm, Form } from "redux-form";

interface IStateProps {
	onSubmit?: () => void;
	handleSubmit?: () => void;
	fields?: {
		url: string;
	};
};

export class ServerInput extends React.Component<IStateProps, any> {
	render() {
		const {
			handleSubmit
		} = this.props;
		return (
			<Form onSubmit={handleSubmit}>
				<Field name="url" component="input" type="text" />	
				<button type="submit">Submit</button>
			</Form>
		);
	}
}

export default reduxForm({
	form: "hostnameInput",
})(ServerInput);