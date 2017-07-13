import * as React from "react";
import * as renderer from "react-test-renderer";

import Service from "../../../src/sentry/components/Service";

describe("Service", () => {

    it("renders a basic Service", () => {
        const component = renderer.create(
            <Service service={{name: "test", script: "test", test: "test", status: false}} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});
