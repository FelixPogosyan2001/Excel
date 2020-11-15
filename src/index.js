import '@babel/polyfill';
import './styles/index.scss';
import {Excel} from '@/components/excel/Excel';
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";

const app = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table]
});

app.render();
