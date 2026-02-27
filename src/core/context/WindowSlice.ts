import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IWindow } from '../interfaces/IWindow'

type WindowSliceState = {
    byId: Record<IWindow['id'], IWindow>
    allIds: IWindow['id'][],
    highestZIndex: number,
    focusedWindowId: IWindow['id'],
}
const initialState: WindowSliceState = {
    byId: {},
    allIds: [],
    highestZIndex: 0,
    focusedWindowId: "",
}

const recalculateZIndex = (state: WindowSliceState) => {
    let recalculatedHighestZIndex: IWindow['zIndex'] = -1;
    let highestZIndexWindowId: IWindow['id'] = "";

    state.allIds.forEach(id => {
        const win = state.byId[id];
        if (win.zIndex > recalculatedHighestZIndex && !win.isMinimized) {
            recalculatedHighestZIndex = win.zIndex;
            highestZIndexWindowId = win.id;
        }
    })

    state.focusedWindowId = highestZIndexWindowId;

}

export const windowSlice = createSlice({
    name: 'window',
    initialState,
    reducers: {
        addWindow: (state, action: PayloadAction<IWindow>) => {
            const window = action.payload;
            state.highestZIndex += 1;
            state.byId[window.id] = {
                ...window,
                zIndex: state.highestZIndex
            }
            state.allIds.push(window.id)
            state.focusedWindowId = window.id
        },
        removeWindow: (state, action: PayloadAction<IWindow['id']>) => {
            const windowId = action.payload;
            delete state.byId[windowId]
            state.allIds = state.allIds.filter(id => id !== windowId)

            if (state.focusedWindowId === windowId) {
                recalculateZIndex(state)
            }
        },
        bringWindowToTop: (state, action: PayloadAction<Pick<IWindow, 'id'>>) => {
            const { id } = action.payload;

            const window = state.byId[id]
            if (window && window.zIndex < state.highestZIndex) {
                window.zIndex = state.highestZIndex + 1;
                state.highestZIndex += 1
            }
            if (window && state.focusedWindowId !== window.id) {
                state.focusedWindowId = window.id
            }
        },
        updateWindow: (state, action: PayloadAction<Partial<IWindow> & { id: IWindow['id'] }>) => {
            const { id, ...changes } = action.payload;
            if (state.byId[id]) {
                state.byId[id] = { ...state.byId[id], ...changes };
            }
        },
        minimizeWindow: (state, action: PayloadAction<IWindow['id']>) => {
            const id = action.payload;
            if (state.byId[id]) {
                state.byId[id] = { ...state.byId[id], isMinimized: true, zIndex: 0 };
            }
            recalculateZIndex(state)
        },
        unMinimizeWindow: (state, action: PayloadAction<IWindow['id']>) => {
            const id = action.payload;
            const window = state.byId[id];
            if (window) {
                state.highestZIndex += 1
                state.byId[id] = { ...window, isMinimized: false, zIndex: state.highestZIndex };
                state.focusedWindowId = id;
            }

        }

    },
})

export const { addWindow, removeWindow, bringWindowToTop, updateWindow, minimizeWindow, unMinimizeWindow } = windowSlice.actions

export default windowSlice.reducer
