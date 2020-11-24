import '@babel/polyfill';
import './styles/index.scss';
import {Router} from "@/core/Router";
import {DashboardPage} from "@/pages/dashboard/Dashboard";
import {ExcelPage} from "@/pages/Excel";

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})
