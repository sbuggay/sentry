const Cache = require("../src/Cache").Cache;
const defaultConfig = require("../src/Cache").defaultConfig;
let cache;

describe("Cache", () => {
    beforeEach(() => {
        cache = new Cache();
    });

    it("should return a cache", () => {
        expect(cache instanceof Cache).toEqual(true);
    });

    it("should have the default config if none is provided", () => {
        expect(cache.getConfig()).toEqual(defaultConfig);
    });

    it("should have the assignment of the default config with a provided config", () => {
        const config = {
            interval: 2000
        }
        cache = new Cache(config);
        
        expect(cache.getConfig()).toEqual(Object.assign({}, defaultConfig, config));
    });

    it("should set and get a key value pair", () => {
        let key = "key";
        let value = "value";
        cache.set(key, value);

        expect(cache.get(key)).toEqual(value);
    });

    it("should clear the cache", () => {
        cache.set("key", "value");
        cache.addIntervalFunction("key", function () { });
        cache.clear();
        
        expect(cache.get("key")).toEqual(undefined);
        expect(cache.getIntervalFunctions()["key"]).toEqual(undefined);
    });

    it("should add an intervalFunction", () => {
        const key = "key";
        const value = function () { };
        cache.addIntervalFunction(key, value);

        const functions = cache.getIntervalFunctions();

        expect(functions[key]).toEqual(value);
    });

    it("should add intervalFunctions", () => {
        const key = "key";
        const value = [function () { }, function () { }];
        cache.addIntervalFunctionArray(key, value);

        const functions = cache.getIntervalFunctions();

        expect(functions[key]).toEqual(value);
    });
});