export class TableSelection {
    static indicator = 'selected';
    static chosen = 'active';

    constructor() {
        this.group = [];
        this.current = null;
    }

    get selectedIds() {
        return this.group.map(($cell) => $cell.data.id);
    }

    select($cell) {
        this.clear();
        $cell.focus().addClass(TableSelection.chosen);
        this.group.push($cell);
        this.current = $cell;
    }

    clear() {
        this.group.forEach(($cell) => {
            $cell.removeClass(TableSelection.indicator);
            $cell.removeClass(TableSelection.chosen)
        });
        this.group = [];
    }

    selectGroup(group) {
        this.clear();
        group.forEach(($cell) => {
            if ($cell.$el === this.current.$el) {
                $cell.addClass(TableSelection.chosen);
            } else {
                $cell.addClass(TableSelection.indicator);
            }

            this.group.push($cell);
        });
    }

    applyStyle(style) {
        this.group.forEach(($cell) => {
            Object.entries(style).forEach((item) => {
                $cell.css(item[0], item[1]);
            })
        })
    }
}