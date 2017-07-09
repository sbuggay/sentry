export const POLLING_TIME = 5000;

export enum STATUS {
    OUTAGE,
    AVAILABLE,
    UNKNOWN,
    ISSUE,
    MAINTENANCE
}

export interface IView {
    [key: string]: "Servers" | "Services";
}

export const view: IView = {
    servers: "Servers",
    services: "Services"
};
