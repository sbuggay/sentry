import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";

import { initialState } from "../../../src/sentry/reducer";
import ServerViewSelect, { ServerViewSelect as UServerViewSelect} from "../../../src/sentry/components/ServerViewSelect";

describe("ServerViewSelect", () => {

    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <ServerViewSelect />
            </Provider>
        );
    });

    it("contains the component", () => {
        expect(wrapper.find(ServerViewSelect)).toHaveLength(1);
    });
});