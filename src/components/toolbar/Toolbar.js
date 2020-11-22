import {createToolbar} from "@/components/toolbar/template";
import {$} from "@/core/dom";
import {ExcelStateComponent} from "@/core/ExcelStateComponent";

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            ...options,
            subscribe: ['toolbarStyles'],
            events: ['click']
        });
    }

    prepare() {
        this.initState(this.store.getState().toolbarStyles);
    }

    storeChanged(changes) {
        this.setState(changes.toolbarStyles);
    }

    onClick(event) {
       const $target = $(event.target);

       if ($target.data.type === 'button') {
           this.$emit('toolbar:applyStyle', JSON.parse($target.data.value));
       }
    }

    toHTML() {
        return createToolbar(this.state);
    }
}