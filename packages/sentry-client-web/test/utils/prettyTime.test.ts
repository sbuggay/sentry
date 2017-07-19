import { pretty } from "../../src/utils/prettyTime";

describe("prettyTime", () => {
    it("displays seconds", () => {
        expect(pretty(1)).toEqual("1 second");
        expect(pretty(2)).toEqual("2 seconds");
        expect(pretty(59)).toEqual("59 seconds");
    });

    it("displays minutes", () => {
        expect(pretty(60)).toEqual("1 minute");
        expect(pretty(61)).toEqual("1 minute");
        expect(pretty(119)).toEqual("1 minute");
        expect(pretty(120)).toEqual("2 minutes");
        expect(pretty(3599)).toEqual("59 minutes");
    });
});
