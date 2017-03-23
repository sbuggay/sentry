import * as actions from "../../src/sentry/actions";
import * as actionTypes from "../../src/sentry/actionTypes";
import reducer, {
	initialState
} from "../../src/sentry/reducer";

test("sentry reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual(intialState);
	});

	it("should reduce add server", () => {
		let testHostName = "TEST_SERVER_HOSTNAME";
		expect(reducer(undefined, actions.addServer(testHostName)).toEqual({
			...initialState,
			servers: [
				testHostName
			]
		}));
	});

	it("should reduce remove server", () => {

	});
});