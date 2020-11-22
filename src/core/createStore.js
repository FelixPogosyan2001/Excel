export function createStore(reducer, initialState) {
    let state = reducer(initialState, {});
    const listeners = [];

    return {
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action);
            listeners.forEach((listener) => listener(state));
        },
        subscribe(fn) {
            listeners.push(fn);

            return {
                unsubscribe: () => {
                    listeners.splice(listeners.indexOf(fn), 1);
                }
            }
        }
    }
}