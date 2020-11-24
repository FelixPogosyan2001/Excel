export function capitalize(eventName) {
    return eventName.replace(eventName[0], eventName[0].toUpperCase())
}

export function storage(key, value = null) {
    if (value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    return JSON.parse(localStorage.getItem(key));
}

export function deleteFromStorage(key) {
    if (key) {
        localStorage.removeItem(key);
        return true;
    }

    return false;
}

export function isEqual(prev, next) {
    if (typeof prev === 'object' && typeof next === 'object') {
        return JSON.stringify(prev) === JSON.stringify(next);
    }

    return prev === next;
}

export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
        .join('; ');
}

export function debounce(fn, time) {
    let timer;

    return function(...args) {
        const later = () => {
            clearTimeout(timer);
            fn(...args);
        };

        clearTimeout(timer);

        timer = setTimeout(later, time)
    }
}