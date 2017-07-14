import * as actions from "../src/actions";
import * as actionTypes from "../src/actionTypes";

import { guid } from "../src/lib/utils";
import { EStatus } from "../src/constants";

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
				status: EStatus.outage
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

	it("should update lastUpdated", () => {
		expect(actions.updateLastUpdated(0)).toEqual({
			type: actionTypes.UPDATE_LAST_UPDATED,
			payload: 0
		});
	});
});
