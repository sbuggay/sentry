import * as actions from "../../src/sentry/actions";
import * as actionTypes from "../../src/sentry/actionTypes";

import { guid } from "../../src/sentry/lib/utils";
import { STATUS } from "../../src/sentry/constants";

describe("actions", () => {
	it("should create an action to add a server", () => {
		const name = "test_name";
		const host = "test_host";
		const id = guid();
		expect(actions.addServer(name, host, id)).toEqual({
			type: actionTypes.SERVER_ADD,
			payload: {
				id,
				name,
				host,
				status: STATUS.OUTAGE
			}
		});
	});

	it("should create an action to remove a server", () => {
		const id = guid();
		expect(actions.removeServer(id)).toEqual({
			type: actionTypes.SERVER_REMOVE,
			payload: id
		});
	});
});
