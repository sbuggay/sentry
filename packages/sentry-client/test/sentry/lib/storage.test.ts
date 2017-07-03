import * as storage from "../../../src/sentry/lib/storage";


describe("storage", () => {

    it("should exist", () => {
        expect(storage.load).toBeDefined;
        expect(storage.save).toBeDefined;
    });

});