import {ExcelComponent} from "@/core/ExcelComponent";
import {createTable} from "@/components/table/template";
import {resizeHandler} from "@/components/table/resize";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@/core/dom";
import * as actions from "@/redux/actions";
import {
    isCell, isElement,
    matrix,
    parseCellId,
    shouldResize
} from "@/components/table/helpers";
import {defaultStyles} from "@/constants";
import {parse} from "@/core/parse";

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
        this.$on('formula:done', () => this.selection.current.focus());
        this.$on('formula:input', (data) => {
            this.selection.current.attr('data-value', data);
            this.selection.current.text = parse(data);
            this.updateInStore(data);
        });
        this.$on('toolbar:applyStyle', (style) => {
            this.selection.applyStyle(style);
            this.$dispatch(actions.applyStyle({
                ids: this.selection.selectedIds,
                value: style
            }));
        })
    }

    updateInStore(value) {
        this.$dispatch(actions.changeValue({
            id: this.selection.current.data.id,
            value
        }));
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell.data.value);
        this.$dispatch(actions.changeToolbar(
            $cell.getStyles(Object.keys(defaultStyles))
        ));
    }

    async resizeTable(e) {
        try {
            const data = await resizeHandler(e, this.$root);
            this.$dispatch(actions.tableResize(data));
        } catch (e) {
            console.log(e);
        }
    }

    onInput(e) {
        const text = e.target.textContent.trim();
        this.updateInStore(text);
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
            this.resizeTable(e);
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
        return createTable(20, this.store.getState());
    }
}


