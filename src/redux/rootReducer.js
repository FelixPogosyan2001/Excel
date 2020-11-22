import {
    APPLY_STYLE,
    CHANGE_TEXT, CHANGE_TITLE,
    CHANGE_TOOLBAR_STYLES,
    RESIZE_TABEL
} from "@/redux/types";
import {defaultStyles} from "@/constants";

export const initialState = {
    cols: {},
    rows: {},
    formulaValue: '',
    title: '',
    cellsData: {},
    toolbarStyles: defaultStyles,
    cellsStyles: {}
}

export function rootReducer(state, action) {
    switch (action.type) {
        case RESIZE_TABEL:
            return {
                ...state,
                [action.payload.resizeType]: {
                    ...state[action.payload.resizeType],
                    [action.payload.id]: action.payload.value
                }
            }
        case CHANGE_TEXT:
            return {
                ...state,
                formulaValue: action.payload.value,
                cellsData: {
                    ...state.cellsData,
                    [action.payload.id]: action.payload.value
                }
            }
        case CHANGE_TOOLBAR_STYLES:
            return {
                ...state,
                toolbarStyles: {...state.toolbarStyles, ...action.payload}
            }
        case APPLY_STYLE:
            action.payload.ids.forEach((id) => {
                state.cellsStyles[id] = {
                    ...state.cellsStyles[id],
                    ...action.payload.value
                };
            });

            return {
                ...state,
                toolbarStyles: {
                    ...state.toolbarStyles,
                    ...action.payload.value
                }
            }
        case CHANGE_TITLE:
            return {
                ...state,
                title: action.payload
            }
        default:
            return state;
    }
}