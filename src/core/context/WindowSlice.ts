import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IWindow } from '../interfaces/IWindow'

type WindowSliceState = {
    byId: Record<number, IWindow>
    allIds: number[]
}
const initialState: WindowSliceState = {
    byId: {},
    allIds: []
}
export const windowSlice = createSlice({
    name: 'window',
    initialState,
    reducers: {
        addWindow: (state, action: PayloadAction<IWindow>) => {
            const window = action.payload
            state.byId[window.id] = window
            state.allIds.push(window.id)
        },
        removeWindow: (state, action: PayloadAction<number>) => {
            const windowId = action.payload;
            delete state.byId[windowId]
            state.allIds = state.allIds.filter(id => id !== windowId)
        },
        setWindowState: (state, action: PayloadAction<Pick<IWindow, 'id' | 'state'>>) => {
            const { id, state: windowState } = action.payload;

            const window = state.byId[id];
            if (window) {
                window.state = windowState
            }
        },
        setWindowSize: (state, action: PayloadAction<Pick<IWindow, 'id' | 'size'>>) => {
            const { id, size } = action.payload;

            const window = state.byId[id];
            if (window) {
                window.size = size
            }
        },
        setWindowPosition: (state, action: PayloadAction<Pick<IWindow, 'id' | 'position'>>) => {
            const { id, position } = action.payload;
            const window = state.byId[id];
            if (window) {
                window.position = position
            }
        },
        bringWindowToTop: (state, action: PayloadAction<Pick<IWindow, 'id' | 'zIndex'>>) => {
            const { id, zIndex } = action.payload;

            const window = state.byId[id]
            if (window) {
                window.zIndex = zIndex;
            }
        }

    },
})

// Action creators are generated for each case reducer function
export const { addWindow, removeWindow, setWindowState, setWindowSize, setWindowPosition, bringWindowToTop } = windowSlice.actions

export default windowSlice.reducer
