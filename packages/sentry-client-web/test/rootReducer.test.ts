import rootReducer from "../src/rootReducer";

describe("rootReducer", () => {
    it("is a function", () => {
        expect(rootReducer).toBeInstanceOf(Function);
    });
});
