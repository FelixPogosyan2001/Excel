import {$} from "../core/dom";
import {ActiveRoute} from "../core/ActiveRoute";

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector not provided in Router!');
        }

        this.$placeholder = $(selector);
        this.routes = routes;
        this.page = null;
        this.changedURL = this.changedURL.bind(this);
        this.init();
    }

    init() {
        window.addEventListener('hashchange', this.changedURL);
        this.changedURL();
    }

    changedURL() {
        let route;

        if (this.page) this.page.destroy();
        if (ActiveRoute.path.includes('excel')) {
            route = 'excel'
        } else if (ActiveRoute.path === 'dashboard' || !ActiveRoute.path) {
            route = 'dashboard';
        } else {
            return false;
        }

        this.page = new this.routes[route](ActiveRoute.param);

        this.$placeholder.clear();
        this.$placeholder.append(this.page.getRoot());
        this.page.afterRender();
    }
}