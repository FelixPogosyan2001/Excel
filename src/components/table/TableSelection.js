export class TableSelection {
    static indicator = 'selected';
    static chosen = 'active';

    constructor() {
        this.group = [];
        this.current = null;
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
}