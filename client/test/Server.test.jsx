import React from "react";
import renderer from "react-test-renderer";
import Server from "../src/components/Server";

test("test server component", () => {
	const component = renderer.create(
		<Server></Server>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
