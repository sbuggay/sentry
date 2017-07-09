import * as actionTypes from "./actionTypes";

export interface IServer {
    name: string;
    status?: number;
    loaded?: boolean;
    staticInfo?: {
        arch: string;
        platform: string;
        release: string;
        type: string;
        endianness: string;
    };
    dynamicInfo?: {
        hostname: string;
        uptime: number;
        freemem: number;
        totalmem: number;
        cpus: [{
            model: string;
            speed: number;
            times: {
                user: number;
                nice: number;
                sys: number;
                idle: number;
                irq: number;
            };
        }];
    };
    serviceInfo?: {
        [key: string]: {
            name: string;
            script: string;
            test: string;
            status: boolean;
        };
    };
}

export interface IState {
    title: string;
    view: string;
    servers: {
        [id: string]: IServer
    };
    lastUpdated?: number;
}

export const initialState: IState = {
    title: "",
    view: "servers",
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
