import fetch from "node-fetch";

import { EStatus } from "./constants";

export function pollServers(hosts: string[]) {
    const promises = hosts.map((host) => {
        console.log(`polling ${host}`);
        return pollServer(host);
    });
    return Promise.all(promises);
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