import '@babel/polyfill';
import './styles/index.scss';
import {Excel} from '@/components/excel/Excel';
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";
import {createStore} from "@/core/createStore";
import {initialState, rootReducer} from "@/redux/rootReducer";
import {defaultStyles} from "@/constants";
import {debounce, storage} from "@/core/utilities";

const normalize = (state) => ({
    ...state, toolbarStyles: defaultStyles, formulaValue: ''
});

const store = createStore(rootReducer, storage('excel-state')
    ? normalize(storage('excel-state'))
    : initialState);

store.subscribe(debounce((state) => {
    storage('excel-state', state);
}, 1000));

const app = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});

app.render();
