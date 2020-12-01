import {Router} from "../core/Router";
import {Page} from "../core/Page";

class Dashboard extends Page {
    getRoot() {
        const root = document.createElement('div');
        root.innerHTML = 'Work';
        return root;
    }
}

class Excel extends Page {}

describe('router:', () => {
    let router;
    let app;

    beforeEach(() => {
        app = document.createElement('div');
        router = new Router(app, {
            excel: Excel,
            dashboard: Dashboard
        });
    });

    test('should be defined', () => {
        expect(router).toBeDefined();
    });

    test('should show dashboard page', () => {
        router.changedURL();

        expect(app.innerHTML).toBe('<div>Work</div>');
    })
})