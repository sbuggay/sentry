import * as React from "react";
import renderer from "react-test-renderer";
import { ServerList } from "../../../src/sentry/components/ServerList";

describe("ServerList", () => {
	const component = renderer.create(
		<ServerList/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
