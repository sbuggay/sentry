import fetch from "node-fetch";

export function pollServers(hosts: string[]) {
    const promises = hosts.map((host) => {
        return pollServer(host);
    });
    return Promise.all(promises);
}

export function pollServer(host: string) {
    return new Promise((resolve, reject) => {
        fetch(host, {})
            .then((res: any) => {
                return res.json();
            }).then((json: JSON) => {
                resolve({ [host]: json });
            }).catch((error) => {
                reject(error);
            });
    });
}