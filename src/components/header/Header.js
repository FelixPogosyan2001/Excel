import {ExcelComponent} from "@/core/ExcelComponent";
import * as actions from "@/redux/actions";
import {defaultTitle} from "@/constants";

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            ...options,
            name: 'Header',
            events: ['input']
        });
    }

    onInput(e) {
        this.$dispatch(actions.changeTitle(e.target.value.trim()));
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle;

        return `
            <input type="text" class="input" value="${title}"  />
            <div>
                <button>
                    <i class="material-icons">delete</i>
                </button>
                <button>
                    <i class="material-icons">exit_to_app</i>
                </button>
            </div>
        `
    }
}