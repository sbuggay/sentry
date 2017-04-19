import * as React from "react";
import { Field, reduxForm, Form } from "redux-form";

interface IProps {
	handleSubmit?: Function;
	onSubmit?: Function;
};

export class ServerForm extends React.Component<IProps, any> {
	render() {
		const { handleSubmit, onSubmit } = this.props;
		return (
			<Form onSubmit={handleSubmit(onSubmit)} style={{ border: "1px solid black" }}>
				<legend>Server Form</legend>
				<div>
					<label>Hostname</label>
					<Field name="hostname" component="input" type="text" label="hostname" />
				</div>
				<div>
					<label>Auth key</label>
					<Field name="auth" component="input" type="text" label="hostname" disabled={true} />
				</div>

				<div>
					<label>Poll</label>
					<div>
						<Field name="poll" component="input" type="checkbox" disabled={true} />
					</div>
				</div>

				<button type="submit">Submit</button>
			</Form>
		);
	}
};

export default reduxForm({
	form: "hostnameInput"
})(ServerForm);