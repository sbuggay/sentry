import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";

import index from "../src/index";

describe("index", () => {
    it("renders", () => {
        expect(JSON.stringify(
            Object.assign({}, index, { _reactInternalInstance: "censored" })
        )).toMatchSnapshot();
    });
});
