import * as actions from "../../src/sentry/actions";
import * as actionTypes from "../../src/sentry/actionTypes";
import reducer, { initialState } from "../../src/sentry/reducer";

import { guid } from "../../src/sentry/lib/utils";

describe("sentry reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it("should reduce add server", () => {
		const id = guid();
		const name = "test_name";
		const host = "test_host";
		expect(reducer(undefined, actions.addServer(name, host, id))).toEqual({
			...initialState,
			servers: {
				[id]: {
					id: id,
					name: name,
					host: host,
					status: 2
				}
			}
		});
	});

	it("should reduce remove server", () => {

	});
});