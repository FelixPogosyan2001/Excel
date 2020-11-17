import {$} from "@/core/dom";

export function resizeHandler(e, $root) {
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
            result = pageX - coordinates.right + resizerCoors.width;
            $resizer.css('transform', `translateX(${result}px)`);
        } else if (resize === 'row') {
            result = pageY - coordinates.bottom + resizerCoors.height;
            $resizer.css('transform', `translateY(${result}px)`);
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;

        $resizer.css('transform', '');
        $resizer.clear();

        if (resize === 'col') {
            $parent.css('width', `${coordinates.width + result}px`);

            $root
                .findAll(`.cell[data-col = "${$parent.data.col}"]`)
                .forEach((cell) => {
                    cell.style.width = `${coordinates.width + result}px`
                });
        } else if (resize === 'row') {
            $parent.css('height', `${coordinates.height + result}px`);
        }
    }
}
