export function parse(value = '') {
    try {
        if (value.startsWith('=')) {
            return eval(value.slice(1));
        }
    } catch (e) {
        return value;
    }

    return value;
}