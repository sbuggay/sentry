import * as storage from "../../../src/sentry/lib/storage";

describe("storage", () => {

    it("should exist", () => {
        expect(storage.load).toBeDefined();
        expect(storage.save).toBeDefined();
    });

    it ("should load", () => {
        localStorage.getItem = jest.fn();

        storage.load();

        expect(localStorage.getItem).toBeCalled();
    });

    it ("should save", () => {
        localStorage.setItem = jest.fn();
        storage.save({
            title: "",
            servers: {}
        });

        expect(localStorage.setItem).toBeCalled();
    });
});
