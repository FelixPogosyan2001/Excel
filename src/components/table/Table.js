import {ExcelComponent} from "@/core/ExcelComponent";
import {createTable} from "@/components/table/template";
import {resizeHandler} from "@/components/table/resize";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@/core/dom";
import {
    isCell, isElement,
    matrix,
    parseCellId,
    shouldResize
} from "@/components/table/helpers";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            events: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    init() {
        super.init();
        this.selection = new TableSelection();
        const $selectedCell = this.$root.find('[data-id="0:0"]');
        this.selectCell($selectedCell);
        this.$on('formula:input', (data) => this.selection.current.text = data);
        this.$on('formula:done', () => this.selection.current.focus());
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:input', $cell.text);
    }

    onInput(e) {
        const text = e.target.textContent.trim();
        this.$emit('table:input', text);
    }

    onKeydown(e) {
        const [row, col] = parseCellId(this.selection.current.data);
        const CODES = {
            'ArrowUp': `"${row - 1}:${col}"`,
            'ArrowDown': `"${row + 1}:${col}"`,
            'ArrowLeft': `"${row}:${col - 1}"`,
            'ArrowRight': `"${row}:${col + 1}"`,
            'Enter': `"${row + 1}:${col}"`,
            'Tab': `"${row}:${col + 1}"`,
        };
        const type = CODES[e.key];

        if (type && !e.shiftKey) {
            e.preventDefault();
            const $el = this.$root.find(`[data-id = ${type}]`);
            isElement($el) && this.selectCell($el);
        }
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            resizeHandler(e, this.$root);
        } else if (isCell(e)) {
            const $cell = $(e.target);

            if (e.shiftKey) {
                const chosenCell = parseCellId($cell.data);
                const currentCell = parseCellId(this.selection.current.data);

                const metaData = {
                    row: Math.max(chosenCell[0], currentCell[0]),
                    col: Math.max(chosenCell[1], currentCell[1]),
                    startRow: Math.min(chosenCell[0], currentCell[0]),
                    startCol: Math.min(chosenCell[1], currentCell[1])
                }

                this.selection.selectGroup(matrix(metaData, this.$root));
            } else {
                this.selectCell($cell);
            }
        }
    }

    toHTML() {
        return createTable(20);
    }
}


