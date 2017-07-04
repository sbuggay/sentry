import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";

import { initialState } from "../../../src/sentry/reducer";
import App, { App as UApp} from "../../../src/sentry/components/App";

xdescribe("App", () => {

    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });

    it("contains the component", () => {
        expect(wrapper.find(App)).toHaveLength(1);
    });
});