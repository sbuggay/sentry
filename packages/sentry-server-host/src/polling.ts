import fetch from "node-fetch";

import { EStatus } from "./constants";

export interface IServer {
    host: string;
    apikey: string;
}

export function pollServers(servers: IServer[]) {
    const promises = servers.map((server) => {
        return pollServer(server.host, server.apikey);
    });
    return Promise.all(promises);
}

export function pollServer(host: string, apikey: string) {
    return fetch(host, {
        headers: {
            "apikey": apikey
        }
    }).then((res: any) => res.json())
        .then((json: JSON) => {
            return {
                name: host,
                host: host,
                status: EStatus.available,
                ...json
            };
        }).catch((error) => {
            console.error(error);
            return {
                name: host,
                host: host,
                status: EStatus.outage
            };
        });
}