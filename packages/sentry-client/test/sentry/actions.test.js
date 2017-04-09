import * as actions from "../../src/sentry/actions";
import * as actionTypes from "../../src/sentry/actionTypes";

describe("actions", () => {
	it("should create an action to add a server", () => {
		const text = "TEST_HOSTNAME";
		console.log(actions.addServer("TEST"));
		expect(actions.addServer(text)).toEqual({
			type: actionTypes.REMOVE_SERVER,
			payload: text
		});
	});

	it("should create an action to remove a server", () => {
		const text = "TEST_HOSTNAME";
		expect(actions.removeServer(text)).toEqual({
			type: actionTypes.REMOVE_SERVER,
			payload: text
		});
	});
})