// Polling time, in ms
export const POLLING_TIME = 10000;

export enum EStatus {
	outage,
	available,
	unknown,
	issue,
	maintenence
}

export enum EView {
	servers = "Servers",
	services = "Services"
}
