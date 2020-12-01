import {$} from "@/core/dom";

export function resizeHandler(e, $root) {
    return new Promise((resolve) => {
        const $resizer = $(e.target);
        const {resize} = $resizer.data;
        const $parent = $resizer.closest(`[data-type = "resizable"]`);
        const $resizeLine = $.create('div', `${resize}-line`);
        const coordinates = $parent.getCoordinates();
        const resizerCoors = $resizer.getCoordinates();
        const rootCoors = $root.getCoordinates();
        let result;

        if (resize === 'col') {
            $resizeLine.css('height', `${rootCoors.height}px`);
        } else {
            $resizeLine.css('width', `${rootCoors.width}px`);
        }

        $resizer.append($resizeLine);

        document.onmousemove = ({pageX, pageY}) => {
            if (resize === 'col') {
                const value = coordinates.right + scrollX;
                result = pageX - value + resizerCoors.width;
                $resizer.css('transform', `translateX(${result}px)`);
            } else if (resize === 'row') {
                const value = coordinates.bottom + scrollY;
                result = pageY - value + resizerCoors.height;
                $resizer.css('transform', `translateY(${result}px)`);
            }
        }

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;

            $resizer.css('transform', '');
            $resizer.clear();

            if (resize === 'col') {
                const colWidth = coordinates.width + result;

                $parent.css('width', `${colWidth}px`);

                $root
                    .findAll(`.cell[data-col = "${$parent.data.col}"]`)
                    .forEach((cell) => {
                        cell.style.width = `${colWidth}px`
                    });

                resolve({
                    id: $parent.data.col,
                    value: colWidth,
                    resizeType: resize + 's'
                });
            } else if (resize === 'row') {
                const rowHeight = coordinates.height + result;

                $parent.css('height', `${coordinates.height + result}px`);

                resolve({
                    id: $parent.data.row,
                    value: rowHeight,
                    resizeType: resize + 's'
                });
            }
        }
    });
}
