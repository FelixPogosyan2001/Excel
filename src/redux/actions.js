import {
    APPLY_STYLE,
    CHANGE_TEXT, CHANGE_TITLE,
    CHANGE_TOOLBAR_STYLES,
    RESIZE_TABEL
} from "@/redux/types";

export const tableResize = (data) => ({
    type: RESIZE_TABEL,
    payload: data
});

export const changeValue = (cellInfo) => ({
    type: CHANGE_TEXT,
    payload: cellInfo
});

export const changeToolbar = (styles) => ({
    type: CHANGE_TOOLBAR_STYLES,
    payload: styles
});

export const applyStyle = (data) => ({
    type: APPLY_STYLE,
    payload: data
})

export const changeTitle = (title) => ({
    type: CHANGE_TITLE,
    payload: title
})