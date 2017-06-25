class Cache {
    constructor(interval = 5000) {
        this.store = {};
        this.intervalFunctions = [];
        this.interval = setInterval(this.runActions.bind(this), interval);
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

    /** Add an action to the action queue, must be a Promise. */
    addAction(key, action) {
        this.intervalFunctions.push({ key, action });
    }

    /** Run all actions and update cache. */
    runActions() {
        this.intervalFunctions.forEach(intervalFunction => {
            intervalFunction.action().then(values => {
                this.set(intervalFunction.key, values);
            });
        });
    }
}

module.exports = Cache;