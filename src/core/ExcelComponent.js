import {DomListener} from '@/core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.events);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.subscriptions = options.subscribe || [];
        this.store = options.store;
        this.unsubscribers = [];
        this.prepare();
    }

    storeChanged() {}

    $dispatch(action) {
        this.store.dispatch(action);
    }

    $emit(event, ...args) {
        return this.emitter.emit(event, ...args);
    }

    $on(event, fn) {
        const unsubscriber = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsubscriber);
    }

    prepare() {}

    init() {
        this.initEventListeners();
    }

    destroy() {
        this.removeEventListeners();
        this.unsubscribers.forEach((unsubscriber) => unsubscriber());
    }

    toHTML() {
        return '';
    }
}