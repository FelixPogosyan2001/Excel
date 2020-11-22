import {isEqual} from "@/core/utilities";

export class StoreSubscriber {
    constructor(store) {
        this.store = store;
    }

    subscribeComponents(components) {
        let prevState = this.store.getState();

        this.sub = this.store.subscribe((state) => {
            Object.keys(state).forEach((item) => {
                if (!isEqual(prevState[item], state[item])) {
                    components.forEach((component) => {
                        if (component.subscriptions.includes(item)) {
                            const changes = {[item]: state[item]};
                            component.storeChanged(changes);
                        }
                    });
                }
            });

            prevState = this.store.getState();
        })
    }

    unsubscribeFromStore() {
        this.sub.unsubscribe();
    }
}