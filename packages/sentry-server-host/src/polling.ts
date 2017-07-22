import fetch from "node-fetch";

export function pollServers(hosts: string[]) {
    return Promise.all(hosts.map((host) => {
        return pollServer(host);
    }));
}

export function pollServer(host: string) {
    return new Promise((resolve, reject) => {
        fetch(host, {})
            .then((res: any) => {
                resolve({ [host]: res.json() });
            });
    });
}