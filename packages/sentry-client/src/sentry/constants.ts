export const POLLING_TIME = 5000;

export enum STATUS {
    OUTAGE,
    AVAILABLE,
    UNKNOWN,
    ISSUE,
    MAINTENANCE
}

interface IView {
    [key: string]: string;
}

export const view: IView = {
    servers: "Servers",
    services: "Services"
};
