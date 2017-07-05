import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";

import { initialState } from "../../../src/sentry/reducer";
import LastUpdated, { LastUpdated as ULastUpdated} from "../../../src/sentry/components/LastUpdated";

describe("LastUpdated", () => {

    const mockStore = configureStore();
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <LastUpdated />
            </Provider>
        );
    });

    it("contains the component", () => {
        expect(wrapper.find(LastUpdated)).toHaveLength(1);
    });
});
