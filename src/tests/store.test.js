import {createStore} from "../core/createStore";

const initialState = 0;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        default:
            return state;
    }
}

describe('createStore: ', () => {
    let store;
    let handler;

    beforeEach(() => {
        store = createStore(reducer);
        handler = jest.fn();
    })

    test('should return store object', () => {
        expect(store).toBeDefined();
        expect(store.subscribe).toBeDefined();
        expect(store.dispatch).toBeDefined();
        expect(store.getState).not.toBeUndefined();
    });

    test('should return another value if action exists', () => {
        store.dispatch({type: 'INCREMENT'});
        expect(store.getState()).toBe(1);
    });

    test('should return initialState without actions', () => {
        expect(store.getState()).toEqual(initialState);
    });

    test('should not call subscriber if unsub exists', () => {
        const {unsubscribe} = store.subscribe(handler);

        unsubscribe();
        store.dispatch({type: 'INCREMENT'});

        expect(handler).not.toBeCalled();
    });

    test('should call subscriber if unsub dont exists', () => {
        store.subscribe(handler);
        store.dispatch({type: 'INCREMENT'});

        expect(handler).toBeCalled();
        expect(handler).toBeCalledWith(1);
    });
})
