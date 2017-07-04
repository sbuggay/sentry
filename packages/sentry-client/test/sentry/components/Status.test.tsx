import * as React from "react";
import * as renderer from "react-test-renderer";
import { Status } from "../../../src/sentry/components/Status";
import { STATUS } from "../../../src/sentry/constants/status";

describe("Status", () => {
	it("renders an available status", () => {
		const component = renderer.create(
			<Status status={STATUS.AVAILABLE} />
		);

		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

    it("renders an outage status", () => {
		const component = renderer.create(
			<Status status={STATUS.OUTAGE} />
		);

		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

    it("renders an issue status", () => {
		const component = renderer.create(
			<Status status={STATUS.ISSUE} />
		);

		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

    it("renders a maintenance status", () => {
		const component = renderer.create(
			<Status status={STATUS.MAINTENANCE} />
		);

		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

});