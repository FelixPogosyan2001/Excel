class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
    }

    html(template) {
        if (typeof template === 'string') {
            this.$el.innerHTML = template;
            return this;
        }

        return this.$el.innerHTML;
    }

    on(eventName, cb) {
        this.$el.addEventListener(eventName, cb);
        return this;
    }

    off(eventName, cb) {
        this.$el.removeEventListener(eventName, cb);
        return this;
    }

    append(node) {
        if (node instanceof Dom) node = node.$el;
        this.$el.append(node);
        return this;
    }

    clear() {
        this.$el.innerHTML = '';
        return this;
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes = '') => {
    const $el = document.createElement(tagName);
    if (classes) $el.classList.add(classes)
    return $($el);
}

