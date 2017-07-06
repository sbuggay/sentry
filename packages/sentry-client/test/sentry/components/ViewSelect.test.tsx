import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";

import { initialState } from "../../../src/sentry/reducer";
import ViewSelect, { ViewSelect as UViewSelect} from "../../../src/sentry/components/ViewSelect";

describe("ServerViewSelect", () => {

    const mockStore = configureStore();
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <ViewSelect />
            </Provider>
        );
    });

    it("contains the component", () => {
        expect(wrapper.find(ViewSelect)).toHaveLength(1);
    });
});
