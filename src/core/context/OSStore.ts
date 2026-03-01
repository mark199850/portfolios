import { configureStore } from '@reduxjs/toolkit'
import { processSliceReducer } from "./ProcessSlice.ts"
import { windowSliceReducer } from './WindowSlice.ts'

export const store = configureStore({
    reducer: {
        window: windowSliceReducer,
        process: processSliceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
