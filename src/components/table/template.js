function createRow(info, data) {
    return `
        <div class="row">
            <div class="row-info">${info}</div>
            <div class="row-data">${data}</div>
        </div>
    `
}

function createColumn(content) {
    return `<div class="column">${content}</div>`
}

function createCell(active) {
    return `<div class="cell ${active}" contenteditable></div>`
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
            return createColumn(char);
        })
        .join('');

    for (let i = 0; i < rowsCount; i++) {
        if (i === 0) rows.push(createRow('', columns));
        else {
            const cells = new Array(colsCount)
                .fill('')
                .map((_, j) => createCell(i === 1 && j === 0 ? 'selected' : ''))
                .join('');

            rows.push(createRow(i, cells))
        }
    }

    return rows.join('');
}