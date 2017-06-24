import * as actions from "../../src/sentry/actions";
import * as actionTypes from "../../src/sentry/actionTypes";

import { guid } from "../../src/sentry/lib/utils";


describe("actions", () => {
	it("should create an action to add a server", () => {
		const host = "TEST_HOSTNAME";
		const id = guid();
		expect(actions.addServer(host, id)).toEqual({
			type: actionTypes.ADD_SERVER,
			payload: {
				id: id,
				host: host,
				status: 2
			}
		});
	});

	it("should create an action to remove a server", () => {
		const id = guid();
		expect(actions.removeServer(id)).toEqual({
			type: actionTypes.REMOVE_SERVER,
			payload: id
		});
	});
})