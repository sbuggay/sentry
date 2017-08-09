export const defaultConfig = {
    interval: 10000,
    timeout: 5000,
}

interface IStore {
    [key: string]: any
}

export default class Cache {
    store: IStore;
    cacheFunctions: {
        [key: string]: Function | Function[]
    };
    config: any;
    interval: any;

    constructor(config = {}) {
        this.setConfig(config);
        this.store = {};
        this.cacheFunctions = {};
        this.interval = setInterval(this.runCacheFunctions.bind(this), this.config.interval);
    }

    /** Get a key. */
    set(key: string, value: any): void {
        this.store[key] = value;
    }

    /** Set a key. */
    get(key: string): any {
        return this.store[key];
    }

    /** Clear the cache. */
    clear() {
        this.store = {};
        this.cacheFunctions = {};
    }

    /** Set the config by assigning it to the default config. */
    setConfig(config: any) {
        this.config = Object.assign({}, defaultConfig, config);
    }

    /** Get the current config. */
    getConfig() {
        return this.config;
    }

    /** Add a function to the function queue. */
    addCacheFunction(key: string, callback: Function) {
        this.cacheFunctions[key] = callback;
    }

     /** Add a function array to the function queue. */
    addCacheFunctions(key: string, array: Function[]) {
        this.cacheFunctions[key] = array;
    }

     /** Get the interval functions. */
    getCacheFunctions() {
        return this.cacheFunctions;
    }

    /** Run all actions and update cache. */
    runCacheFunctions() {
        const intervalFunctions = this.getCacheFunctions();
        Object.keys(intervalFunctions).forEach((key) => {
            const func = intervalFunctions[key];
            if (Array.isArray(func)) {
                func.forEach((element) => {
                    element().then((values: any) => {
                        this.set(key, Object.assign({}, this.get(key), { [values.name]: values }));
                    });
                });
            }
            else {
                func().then((values: any) => {
                    this.set(key, values);
                });
            }
        });
    }
}
