import {DomListener} from '@/core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.events);
        this.name = options.name || '';
    }

    toHTML() {
        return '';
    }
}