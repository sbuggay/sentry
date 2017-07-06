import * as React from "react";
import * as renderer from "react-test-renderer";
import { Status } from "../../../src/sentry/components/Status";
import { STATUS } from "../../../src/sentry/constants/status";

describe("Status", () => {
    it("renders an available status", () => {
        const component = renderer.create(
            <Status status={STATUS.AVAILABLE} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders an outage status", () => {
        const component = renderer.create(
            <Status status={STATUS.OUTAGE} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders an issue status", () => {
        const component = renderer.create(
            <Status status={STATUS.ISSUE} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders a maintenance status", () => {
        const component = renderer.create(
            <Status status={STATUS.MAINTENANCE} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
