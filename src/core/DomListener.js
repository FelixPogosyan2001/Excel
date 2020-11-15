import {capitalize} from "@/core/utilities";

export class DomListener {
    constructor($root, events) {
        if (!$root) throw new Error('No root provided for DomListener!');
        this.$root = $root;
        this.events = events || [];
    }

    initEventListeners() {
        this.events.forEach((event) => {
            const method = getMethodName(event);

            if (!this[method]) {
               throw new Error(
                   `Method ${method} is not implemented ` +
                   `in ${this.name} Component`
               );
            }

            this[method] = this[method].bind(this);
            this.$root.on(event, this[method]);
        })
    }

    removeEventListeners() {
        this.events.forEach((event) => {
            const method = getMethodName(event);
            this.$root.off(event, this[method]);
        })
    }
}

function getMethodName(eventName) {
    return `on${capitalize(eventName)}`
}