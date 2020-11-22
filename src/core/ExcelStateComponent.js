import {ExcelComponent} from "@/core/ExcelComponent";

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args);
    }

    initState(initialState = {}) {
        this.state = {...initialState};
    }

    setState(changes) {
        this.state = {...this.state, ...changes};
        this.$root.html(this.toHTML());
    }
}