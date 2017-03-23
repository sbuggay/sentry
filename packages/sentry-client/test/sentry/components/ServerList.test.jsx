import React from "react";
import renderer from "react-test-renderer";
import { ServerList } from "../../../src/sentry/components/ServerList";

test("test ServerList component", () => {
	const component = renderer.create(
		<ServerList/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
