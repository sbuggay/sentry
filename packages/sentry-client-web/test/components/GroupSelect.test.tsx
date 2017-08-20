import * as React from "react";
import * as renderer from "react-test-renderer";

import GroupSelect from "../../src/components/GroupSelect";

describe("GroupSelect", () => {

    it("renders a basic GroupSelect", () => {
        const component = renderer.create(
            <GroupSelect options={["test", "test"]} selectedIndex={0} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});
