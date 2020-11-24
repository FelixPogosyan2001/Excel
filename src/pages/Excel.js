import {Excel} from "@/components/excel/Excel";
import {Page} from "@/core/Page";
import {defaultStyles} from "@/constants";
import {initialState, rootReducer} from "@/redux/rootReducer";
import {debounce, storage} from "@/core/utilities";
import {createStore} from "@/core/createStore";
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";

export class ExcelPage extends Page {
    constructor(...args) {
        super(...args);
    }

    getRoot() {
        const normalize = (state) => ({
            ...state,
            toolbarStyles: defaultStyles,
            formulaValue: '',
            lastVisit: new Date().toLocaleDateString()
        });

        const store = createStore(rootReducer, storage(`excel-${this.params}`)
            ? normalize(storage(`excel-${this.params}`))
            : JSON.parse(JSON.stringify(initialState)));

        store.subscribe(debounce((state) => {
            storage(`excel-${this.params}`, state);
        }, 1000));

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        });

        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
    }
}