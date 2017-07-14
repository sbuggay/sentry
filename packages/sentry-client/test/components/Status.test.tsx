import * as React from "react";
import * as renderer from "react-test-renderer";
import { Status } from "../../src/components/Status";
import { EStatus } from "../../src/constants";

describe("Status", () => {
    it("renders an available status", () => {
        const component = renderer.create(
            <Status status={EStatus.available} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders an outage status", () => {
        const component = renderer.create(
            <Status status={EStatus.outage} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders an issue status", () => {
        const component = renderer.create(
            <Status status={EStatus.issue} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders a maintenance status", () => {
        const component = renderer.create(
            <Status status={EStatus.maintenence} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
