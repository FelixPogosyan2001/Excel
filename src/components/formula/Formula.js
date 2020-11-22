import {ExcelComponent} from "@/core/ExcelComponent";

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            subscribe: ['formulaValue'],
            events: ['input', 'keydown'],
            ...options
        });
    }

    init() {
        super.init();

        this.input = this.$root.find('.input');

        this.$on('table:select', (content) => {
            this.input.text = content;
        });
    }

    storeChanged({formulaValue}) {
        this.input.text = formulaValue;
    }

    onInput(e) {
        const text = e.target.textContent.trim();
        this.$emit('formula:input', text);
    }

    onKeydown(e) {
        if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            this.$root.find('.input').blur();
            this.$emit('formula:done');
        }
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable="true" spellcheck="false"></div>
        `
    }
}