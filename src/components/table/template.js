function createRow(info, data) {
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${info}
                ${info && '<div class="row-resize" data-resize="row"></div>'}
            </div>
            <div class="row-data">
                ${data}
            </div>
        </div>`
}

function createColumn(content, colNum) {
    return `<div class="column" data-col="${colNum}" data-type="resizable">
                ${content}
                <div class="col-resize" data-resize="col"></div>
            </div>`
}

function createCell(rowNum, colNum) {
    return `<div 
              class="cell" 
              contenteditable 
              data-col="${colNum}"
              data-id="${rowNum}:${colNum}"
            ></div>`
}

export function createTable(rowsCount = 20) {
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
            return createColumn(char, i);
        })
        .join('');

    for (let i = -1; i < rowsCount; i++) {
        if (i < 0) rows.push(createRow('', columns));
        else {
            const cells = new Array(colsCount)
                .fill('')
                .map((_, j) => createCell(i, j))
                .join('');

            rows.push(createRow(i + 1, cells))
        }
    }

    return rows.join('');
}