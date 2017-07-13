// Polling time, in ms
export const POLLING_TIME = 10000;

export enum STATUS {
    OUTAGE,
    AVAILABLE,
    UNKNOWN,
    ISSUE,
    MAINTENANCE
}

// export interface IView {
//     [key: string]: "Servers" | "Services";
// }

export const view: string[] = ["Servers", "Services"];
