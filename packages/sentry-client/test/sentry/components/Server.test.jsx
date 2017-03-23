import React from "react";
import renderer from "react-test-renderer";
import { Server } from "../../../src/sentry/components/Server";

test("test Server component", () => {
	const component = renderer.create(
		<Server hostname="TEST_HOSTNAME" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
