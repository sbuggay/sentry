import * as React from "react";
import * as renderer from "react-test-renderer";
import { Server } from "../../src/components/Server";

describe("Server", () => {
	it("renders server", () => {
		const server = {
			name: "",
			host: "",
			status: 0,
			data: {
			}
		};

		const component = renderer.create(
			<Server server={server} index={0} />
		);

		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

});

// import * as React from "react";
// import { shallow, mount } from "enzyme";
// import * as renderer from "react-test-renderer";
// import ConnectedServer, { Server } from "../../../src/sentry/components/Server";

// import configureStore from "redux-mock-store";
// import { Provider } from "react-redux";

// import reducer from "../../../src/sentry/reducer";
// import { removeServer } from "../../../src/sentry/actions";
// import { createStore } from "redux";

// xdescribe("ConnectedServer", () => {
// 	const mockStore = configureStore();
// 	const initialState = {
// 		index: 0,
// 		app: {
// 			servers: [{}, {}]
// 		}
// 	};

// 	let store: any, wrapper: any;

// 	beforeEach(() => {
// 		store = mockStore(initialState);
// 		wrapper = shallow(<ConnectedServer store={store} />);
// 	});

// 	it("has a button to remove a server", () => {
// 		expect(wrapper.contains(
// 			<div>
// 				<div className="fa fa-times"></div>
// 			</div>
// 		)).toBe(true);
// 	});

// 	it("triggers the action on click", () => {
// 		const onClick = sinon.spy();
// 		wrapper = mount(
// 			<ConnectedServer onClick={onClick} />
// 		);

// 		wrapper.find(".fa-times").simulate("click");
// 		expect(onButtonClick.calledOnce).to.equal(true);
// 	});

// 	it("checks removeServer on dispatch", () => {
// 		store.dispatch(removeServer(initialState.index));
// 		const action = store.getActions();

// 		expect(action[0].type).toBe("REMOVE_SERVER");
// 	});
// });

// xtest("Server", () => {
// 	const component = renderer.create(
// 		<Server hostname="TEST_HOSTNAME" />
// 	);

// 	let tree = component.toJSON();
// 	expect(tree).toMatchSnapshot();
// });
