import * as React from "react";
import * as renderer from "react-test-renderer";

import GroupSelect from "../../../src/sentry/components/GroupSelect";

describe("ServerViewSelect", () => {

    it("contains the component", () => {
        expect(wrapper.find(ViewSelect)).toHaveLength(1);
    });
});
