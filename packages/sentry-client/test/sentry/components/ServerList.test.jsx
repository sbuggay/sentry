import React from "react";
import renderer from "react-test-renderer";
import { ServerList } from "../../../src/sentry/components/ServerList";
import sinon from "sinon";

test("ServerList", () => {
	const component = renderer.create(
		<ServerList servers={[]} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
