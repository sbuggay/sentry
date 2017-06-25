class Cache {
    constructor(interval = 10000) {
        this.store = {};
        this.actions = [];
        this.interval = setInterval(this.runActions, interval);
    }

    set(key, value) {
        this.store[key] = value;
    }

    get(key) {
        return this.store[key];
    }

    clear() {
        this.store = {};
        this.actions = [];
    }

    runActions() {
        this.actions.forEach(action => {
            action();
        })
    }
}

module.exports = Cache;