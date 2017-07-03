import * as utils from "../../../src/sentry/lib/utils";

describe("utils", () => {
    it("guid generates a guid", () => {
        expect(utils.guid).toBeDefined;
        expect(typeof utils.guid()).toBe("string");
    });
});