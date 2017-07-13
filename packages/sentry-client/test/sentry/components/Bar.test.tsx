import * as React from "react";
import * as renderer from "react-test-renderer";

import Bar from "../../../src/sentry/components/Bar";

describe("Bar", () => {

    it("renders a basic Bar", () => {
        const component = renderer.create(
            <Bar percentage={50} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});
