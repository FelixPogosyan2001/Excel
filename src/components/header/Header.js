import {ExcelComponent} from "@/core/ExcelComponent";
import * as actions from "@/redux/actions";
import {defaultTitle} from "@/constants";
import {$} from "@/core/dom";
import {deleteFromStorage} from "@/core/utilities";
import {ActiveRoute} from "@/core/ActiveRoute";

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            ...options,
            name: 'Header',
            events: ['input', 'click']
        });
    }

    onClick(e) {
        const $target = $(e.target);
        const type = $target.data.type || $target.closest('button').data.type;

        if (type === 'exit') {
            ActiveRoute.navigate('dashboard');
        } else if (type === 'delete') {
            const decision = confirm('Вы уверены, что хотите удалить таблицу?');

            if (decision) {
                deleteFromStorage(`excel-${ActiveRoute.param}`);
                ActiveRoute.navigate('dashboard');
            }
        }
    }

    onInput(e) {
        this.$dispatch(actions.changeTitle(e.target.value.trim()));
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle;

        return `
            <input type="text" class="input" value="${title}"  />
            <div>
                <button data-type="delete">
                    <i class="material-icons">delete</i>
                </button>
                <button data-type="exit">
                    <i class="material-icons">exit_to_app</i>
                </button>
            </div>
        `
    }
}