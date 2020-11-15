import {ExcelComponent} from "@/core/ExcelComponent";

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root) {
        super($root, {
            name: 'Formula',
            events: ['input']
        });
    }

    onInput(e) {
        console.log(this);
        console.log(e.target.textContent.trim());
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable="true" spellcheck="false"></div>
        `
    }
}