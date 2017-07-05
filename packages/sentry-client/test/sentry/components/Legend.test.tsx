import * as React from "react";
import * as renderer from "react-test-renderer";
import { Legend } from "../../../src/sentry/components/Legend";

describe("Legend", () => {
	it("renders a legend", () => {
		const component = renderer.create(
			<Legend />
		);

		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
