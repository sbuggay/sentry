import * as actionTypes from "./actionTypes";

export interface IServer {
    name: string;
    status: number;
    data: {
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
    };
};

export interface IState {
    title: string;
    servers: {
        [id: string]: IServer
    };
    lastUpdated?: number;
};

export const initialState: IState = {
    title: "",
    servers: {

    }
};

const reducer = (state = initialState, action: any) => {
    let payload = action.payload;

    switch (action.type) {
        case actionTypes.ADD_SERVER:
            return {
                ...state,
                servers: {
                    ...state.servers,
                    [payload.id]: { ...payload }
                }
            };
        case actionTypes.REMOVE_SERVER:
            return {
                ...state
            };

        case actionTypes.POLL_SERVER:
            return {
                ...state,
                servers: {
                    ...state.servers,
                    [payload.id]: {
                        ...state.servers[payload.id],
                        status: payload.status,
                        data: payload.data
                    }
                }
            };

        case actionTypes.LOAD_STATE:
            return {
                ...state,
                ...payload
            };

        case actionTypes.UPDATE_LAST_UPDATED:
            return {
                ...state,
                lastUpdated: payload
            }

        default:
            return state;
    }
};

export default reducer;