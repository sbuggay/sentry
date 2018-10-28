import fetch from "node-fetch";

import { EStatus } from "./constants";

export function pollServers(hosts: string[]) {
    return Promise.all(hosts.map(pollServer));
}

export function pollServer(host: string) {
    return fetch(host)
        .then((res: any) => res.json())
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