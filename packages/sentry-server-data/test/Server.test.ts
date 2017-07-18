import Server from "../src/Server";

let server;

describe("Cache", () => {
    beforeEach(() => {
        server = new Server();
    });
    
    it("should return an instance of a Server", () => {
        expect(server instanceof Server).toEqual(true);
    });

    it("serverInfo should always return a certain set of keys from cache", () => {
        let serverInfo = server.serverInfo();
        expect(serverInfo instanceof Object).toEqual(true);
        expect(serverInfo.hasOwnProperty("staticInfo")).toEqual(true);
        expect(serverInfo.hasOwnProperty("dynamicInfo")).toEqual(true);
        expect(serverInfo.hasOwnProperty("serviceInfo")).toEqual(true);
    });
});