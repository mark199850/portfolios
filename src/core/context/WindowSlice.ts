import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IWindow } from '../interfaces/IWindow'

const initialState: IWindow[] = []

export const windowSlice = createSlice({
    name: 'window',
    initialState,
    reducers: {
        addWindow: (state, action: PayloadAction<{ window: IWindow, highestId: IWindow['id'] }>) => {
            state.push({ ...action.payload.window, id: action.payload.highestId })
        },
        removeWindow: (state, action: PayloadAction<number>) => {
            return state.filter(window => window.id !== action.payload)
        },
        setWindowCoords: (state, action: PayloadAction<Pick<IWindow, 'id' | 'position'>>) => {
            const { id, position } = action.payload;

            const window = state.find(w => w.id === id);
            if (window) {
                window.position = position;
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addWindow, removeWindow, setWindowCoords } = windowSlice.actions

export default windowSlice.reducer
