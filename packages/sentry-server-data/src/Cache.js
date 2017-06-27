const defaultConfig = {
    interval: 10000,
    timeout: 5000,
}

class Cache {
    constructor(config = {}) {
        this.setConfig(config);
        this.store = {};
        this.intervalFunctions = {};
        this.interval = setInterval(this.runIntervalFunctions.bind(this), this.config.interval);
    }

    /** Get a key. */
    set(key, value) {
        this.store[key] = value;
    }

    /** Set a key. */
    get(key) {
        return this.store[key];
    }

    /** Clear the cache. */
    clear() {
        this.store = {};
        this.intervalFunctions = {};
    }

    /** Set the config by assigning it to the default config. */
    setConfig(config) {
        this.config = Object.assign({}, defaultConfig, config);
    }

    /** Get the current config. */
    getConfig() {
        return this.config;
    }

    /** Add a function to the function queue. */
    addIntervalFunction(key, callback) {
        this.intervalFunctions[key] = callback;
    }

     /** Add a function array to the function queue. */
    addIntervalFunctionArray(key, array) {
        this.intervalFunctions[key] = array;
    }

     /** Get the interval functions. */
    getIntervalFunctions() {
        return this.intervalFunctions;
    }

    /** Run all actions and update cache. */
    runIntervalFunctions() {
        const intervalFunctions = this.getIntervalFunctions();
        Object.keys(intervalFunctions).forEach((key) => {
            const func = intervalFunctions[key];
            if (Array.isArray(func)) {
                func.forEach((element) => {
                    element().then(values => {
                        this.set(key, Object.assign({}, this.get(key), { [values.name]: values }));
                    });
                });
            }
            else {
                func().then((values) => {
                    this.set(key, values);
                });
            }
        });
    }
}

module.exports = {
    defaultConfig,
    Cache
};