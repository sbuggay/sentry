const defaultConfig = {
    interval: 10000,
    timeout: 5000,
}

class Cache {
    constructor(config) {
        this.setConfig(config);
        this.store = {};
        this.intervalFunctions = [];
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
        this.intervalFunctions = [];
    }

    setConfig(config) {
        this.config = Object.assign({}, defaultConfig, config);
    }

    getConfig() {
        return this.config;
    }

    /** Add an function to the function queue. */
    addIntervalFunction(key, callback) {
        this.intervalFunctions.push({ key, callback });
    }

    addIntervalFunctionArray(key, array) {
        this.intervalFunctions.push({ key, array });
    }

    /** Run all actions and update cache. */
    runIntervalFunctions() {
        this.intervalFunctions.forEach(intervalFunction => {
            // If the actions are an array, run each and assign them into the provided IF name.
            if (intervalFunction.hasOwnProperty("array")) {
                intervalFunction.array.forEach((element) => {
                    element().then(values => {
                        this.set(intervalFunction.key, Object.assign({}, this.get(intervalFunction.key), { [values.name]: values }));
                    });
                });
            }
            else {
                intervalFunction.callback().then((values) => {
                    this.set(intervalFunction.key, values);
                });
            }
        });
    }
}

module.exports = {
    defaultConfig,
    Cache
};