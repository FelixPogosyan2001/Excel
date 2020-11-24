import {Page} from "@/core/Page";
import {$} from "@/core/dom";
import {createRecordsOfTable} from "@/pages/dashboard/helpers";

export class DashboardPage extends Page {
    getRoot() {
        const tableID = Date.now();

        return $.create('div', 'db').html(`
            <div class="db__header">
                <h1>Excel Dashboard</h1>
            </div>
            <div class="db__new">
                <div class="db__view">
                    <a href="#excel/${tableID}" class="db__create">
                        Новая <br /> Таблица
                    </a>
                </div>
            </div>
            <div class="db__table db__view">
                ${createRecordsOfTable()}
            </div>
        `);
    }
}