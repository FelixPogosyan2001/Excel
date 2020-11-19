export class Emitter {
    constructor() {
        this.listeners = {};
    }

    emit(event, ...args) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach((listener) => {
                listener(...args);
            });

            return true;
        }

        return false;
    }

    subscribe(event, cb) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(cb);

        return () => {
            this.listeners[event] = this.listeners[event].filter((listener) => {
                return (listener !== cb);
            })
        }
    }
}