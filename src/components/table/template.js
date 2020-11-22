import {toInlineStyles} from "@/core/utilities";
import {defaultStyles} from "@/constants";
import {parse} from "@/core/parse";

const MinColumnWidth = 120;
const MinRowHeight = 20;

function createRow(info, data, height) {
    return `
        <div 
            class="row" 
            data-type="resizable" 
            data-row="${info - 1}"
            ${height ? `style="height: ${height}"` : ''}
        >
            <div class="row-info">
                ${info}
                ${info && '<div class="row-resize" data-resize="row"></div>'}
            </div>
            <div class="row-data">
                ${data}
            </div>
        </div>`
}

function createColumn(content, colNum, width) {
    return `<div 
                class="column" 
                data-col="${colNum}" 
                data-type="resizable"
                ${width ? `style="width: ${width}"` : ''}
            >
                ${content}
                <div class="col-resize" data-resize="col"></div>
            </div>`
}

function createCell(rowNum, colNum, state) {
    const width = getWidth(state.cols[colNum]);
    const id = `${rowNum}:${colNum}`;
    const value = state.cellsData[id] || '';
    const styles = toInlineStyles({...defaultStyles, ...state.cellsStyles[id]});

    return `<div 
              class="cell" 
              contenteditable 
              data-col="${colNum}"
              data-id="${rowNum}:${colNum}"
              data-value="${value}"
              style="${styles}; ${width ? `width: ${width}` : ''}"
            >${parse(value)}</div>`
}

function getWidth(value) {
    let width;

    if (value) {
        width = ((value >= MinColumnWidth) ? value : MinColumnWidth) + 'px';
    }

    return width;
}

function getHeight(value) {
    let height;

    if (value) {
        height = ((value >= MinRowHeight) ? value : MinRowHeight) + 'px';
    }

    return height;
}

export function createTable(rowsCount = 20, state) {
    const CODES = {
        A: 65,
        Z: 90
    };
    const rows = [];
    const colsCount = CODES.Z - CODES.A + 1;
    const columns = new Array(colsCount)
        .fill('')
        .map((_, i) => {
            const char = String.fromCharCode(CODES.A + i);
            return createColumn(char, i, getWidth(state.cols[i]));
        })
        .join('');

    for (let i = -1; i < rowsCount; i++) {
        if (i < 0) rows.push(createRow('', columns));
        else {
            const cells = new Array(colsCount)
                .fill('')
                .map((_, j) => createCell(i, j, state))
                .join('');

            rows.push(createRow(i + 1, cells, getHeight(state.rows[i])))
        }
    }

    return rows.join('');
}