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
                    <span class="db__title">Cоздать таблицу</span>
                    <div class="db__template">
                        <a href="#excel/${tableID}" class="db__create">
                            <img src="https://ssl.gstatic.com/docs/templates/thumbnails/sheets-blank-googlecolors.png" />             
                        </a>
                        <p>Пустой файл</p>
                    </div>
                </div>
            </div>
            <div class="db__table db__view">
                ${createRecordsOfTable()}
            </div>
        `);
    }
}