export function shouldResize(event) {
    return !!event.target.dataset.resize;
}

export function isCell(event) {
    return !!event.target.dataset.id;
}

export function parseCellId({id}) {
    return id.split(':').map((item) => +item);
}

export function isElement({$el}) {
    return !!$el;
}

export function matrix({startRow, startCol, row, col}, $root) {
    const selectedCells = [];

    for (let i = startRow; i <= row; i++) {
        for (let j = startCol; j <= col; j++) {
            const $el = $root.find(`[data-id = "${i}:${j}"]`);
            selectedCells.push($el);
        }
    }

    return selectedCells;
}