export class Page {
    constructor(params) {
        this.params = params;
    }

    getRoot() {
        throw new Error('Method getRoot does not exist');
    }

    afterRender() {}

    destroy() {}
}