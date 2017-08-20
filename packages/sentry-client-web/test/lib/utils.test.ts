import * as utils from "../../src/lib/utils";

describe("utils guid", () => {
    it("generates a guid", () => {
        expect(utils.guid).toBeDefined();
        expect(typeof utils.guid()).toBe("string");
    });
});

describe("utils formatBytes", () => {
    it("exists", () => {
        expect(utils.formatBytes).toBeDefined();
    });

    it("generates the correct bytes", () => {
        expect(utils.formatBytes(64)).toBe("64B");
        expect(utils.formatBytes(1024)).toBe("1.0KB");
        expect(utils.formatBytes(1048576)).toBe("1.0MB");
        expect(utils.formatBytes(1073741824)).toBe("1.0GB");
    });
});
