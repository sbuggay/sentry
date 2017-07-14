import * as React from "react";
import * as renderer from "react-test-renderer";
import ServerForm from "../../src/components/ServerForm";

describe("ServerForm", () => {
	it("renders a ServerForm", () => {
		const component = renderer.create(
			<ServerForm />
		);

		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
