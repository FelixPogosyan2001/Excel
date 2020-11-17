import {ExcelComponent} from "@/core/ExcelComponent";
import {createTable} from "@/components/table/template";
import {resizeHandler} from "@/components/table/resize";
import {shouldResize} from "@/components/table/helpers";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            events: ['mousedown']
        });
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            resizeHandler(e, this.$root);
        }
    }

    toHTML() {
        return createTable(20);
    }
}


