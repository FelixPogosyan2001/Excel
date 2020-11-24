import {storage} from "@/core/utilities";

function getKeys() {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.key(i);
        item.includes('excel') && keys.push(item);
    }

    return keys;
}

function toRecord(key) {
    const id = +key.split('-')[1];
    const {title, lastVisit} = storage(key);

    return `<li class="db__record">
              <a href="#excel/${id}">${title || 'Новая таблица'}</a>
              <strong>${lastVisit}</strong>
           </li>`;
}

function getRecords(ids) {
    return ids.map(toRecord).join('');
}

export function createRecordsOfTable() {
    const keys = getKeys();

    if (!keys.length) {
        return `<p>У вас нет записей</p>`;
    }

    return `<div class="db__list-header">
                <span>Название</span>
                <span>Дата открытия</span>
             </div>
             <ul class="db__list">
                 ${getRecords(keys)}
             </ul>`
}