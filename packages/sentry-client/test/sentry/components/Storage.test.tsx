import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";

import { initialState } from "../../../src/sentry/reducer";
import Storage, { Storage as UStorage} from "../../../src/sentry/components/Storage";

describe("Storage", () => {

    const mockStore = configureStore();
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <Storage />
            </Provider>
        );
    });

    it("contains the component", () => {
        expect(wrapper.find(Storage)).toHaveLength(1);
    });

    xit("has the dumb compnent", () => {
        // expect(wrapper.find(""))
    });
});
