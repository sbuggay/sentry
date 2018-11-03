import * as actionTypes from "./actionTypes";

import { EView } from "./constants";

// TODO: move these interfaces
export interface ICPU {
	model: string;
	speed: number;
	times: {
		user: number;
		nice: number;
		sys: number;
		idle: number;
		irq: number;
	};
}

export interface IStaticInfo {
	arch: string;
	platform: string;
	release: string;
	type: string;
	endianness: string;
}

export interface IDynamicInfo {
	hostname: string;
	uptime: number;
	freemem: number;
	totalmem: number;
	cpus: ICPU[];
	loadavg: number[];
}

export interface IService {
	name: string;
	script: string;
	test: string;
	status: boolean;
}

export interface IOS {
	os: string;
	dist?: string;
	codename?: string;
	release?: string;
}

export interface IServer {
	name: string;
	host: string;
	status?: number;
	loaded?: boolean;
	staticInfo?: IStaticInfo;
	dynamicInfo?: IDynamicInfo;
	os?: IOS;
	serviceInfo?: {
		[key: string]: IService
	};
}

export interface IState {
	title: string;
	view: EView;
	loading: boolean;
	servers: {
		[id: string]: IServer
	};
	lastUpdated?: number;
}

export const initialState: IState = {
	title: "System Status",
	view: EView.servers,
	loading: false,
	servers: {

	},
	lastUpdated: 0
};

const reducer = (state = initialState, action: any) => {
	const payload = action.payload;

	switch (action.type) {
		case actionTypes.SERVER_ADD:
			return {
				...state,
				servers: {
					...state.servers,
					[payload.id]: { ...payload }
				}
			};
		case actionTypes.SERVER_REMOVE:
			return {
				...state
			};

		case actionTypes.SERVER_POLL:
			return {
				...state,
				loading: true
			};

		case actionTypes.SERVER_POLL_SUCCESS:
			return {
				...state,
				loading: false,
				lastUpdated: Date.now(),
				servers: {
					...state.servers,
					...payload
				}
			};

		case actionTypes.SERVER_POLL_FAILURE:
			return {
				...state,
				lastUpdated: Date.now(),
				loading: false
			};

		case actionTypes.VIEW_CHANGE:
			return {
				...state,
				view: payload
			};

		case actionTypes.STATE_LOAD:
			return {
				...state,
				...payload
			};

		default:
			return state;
	}
};

export default reducer;
