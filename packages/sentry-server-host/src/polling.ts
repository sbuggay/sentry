import fetch from "node-fetch";

import { EStatus } from "./constants";

export function pollServers(hosts: string[]) {
    const promises = hosts.map((host) => {
        return pollServer(host);
    });
    return Promise.all(promises);
}

export function pollServer(host: string) {
    return new Promise((resolve, reject) => {
        fetch(host)
            .then((res: any) => {
                return res.json();
            }).then((json: JSON) => {
                const config = {
                    name: host,
                    host: host,
                    status: EStatus.available
                }
                resolve({ ...config, ...json });
            }).catch((error) => {
                reject(error);
            });
    }).catch(error => {
        console.error(error);
    });
}