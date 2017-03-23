import * as actions from "../../src/sentry/actions";
import * as actionTypes from "../../src/sentry/actionTypes";

test("actions", () => {
	it("should create an action to add a server", () => {
		const text = "TEST_HOSTNAME";
		const expectedAction = {
			type: actionTypes.ADD_SERVER,
			payload: text
		}
		expect(actions.addServer(text)).toEqual(expectedAction);
	})
})