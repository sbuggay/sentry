const defaultConfig = {
    interval: 10000,
    timeout: 5000,
}

class Cache {
    constructor(config) {
        this.config = Object.assign({}, defaultConfig, config);
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

    getConfig() {
        return this.config;
    }

    /** Add an action to the action queue, must be a Promise. */
    addIntervalFunction(key, action) {
        this.intervalFunctions.push({ key, action });
    }

    /** Run all actions and update cache. */
    runIntervalFunctions() {
        this.intervalFunctions.forEach(intervalFunction => {
            intervalFunction.action().then(values => {
                this.set(intervalFunction.key, values);
            });
        });
    }
}

module.exports = {
    defaultConfig,
    Cache
};