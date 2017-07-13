import * as actionTypes from "./actionTypes";

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
}

export interface IService {
    name: string;
    script: string;
    test: string;
    status: boolean;
}

export interface IServer {
    name: string;
    host: string;
    status?: number;
    loaded?: boolean;
    staticInfo?: IStaticInfo;
    dynamicInfo?: IDynamicInfo;
    serviceInfo?: {
        [key: string]: IService
    };
}

export interface IState {
    title: string;
    view: number;
    servers: {
        [id: string]: IServer
    };
    lastUpdated?: number;
}

export const initialState: IState = {
    title: "",
    view: 0,
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

        case actionTypes.SERVER_POLL_SUCCESS:
            return {
                ...state,
                servers: {
                    ...state.servers,
                    [payload.id]: {
                        ...state.servers[payload.id],
                        ...payload
                    }
                }
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

        case actionTypes.UPDATE_LAST_UPDATED:
            return {
                ...state,
                lastUpdated: payload
            };

        default:
            return state;
    }
};

export default reducer;
