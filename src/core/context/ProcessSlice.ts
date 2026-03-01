import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IProcess } from '../interfaces/IProcess'
import type { IPackage } from '../interfaces/IPackage'

type ProcessSliceState = {
    byId: Record<IProcess['id'], IProcess>
    allIds: IProcess['id'][]
}
const initialState: ProcessSliceState = {
    byId: {},
    allIds: []
}
export const processSlice = createSlice({
    name: 'process',
    initialState,
    reducers: {
        spawnProcess: (state, action: PayloadAction<{ packageId: IPackage["id"]; processId: IProcess['id'] }>) => {
            const { packageId, processId } = action.payload;

            state.byId[processId] = {
                packageId: packageId,
                id: processId,
                isBackground: false
            }
            state.allIds.push(packageId)
        },
        killProcess: (state, action: PayloadAction<IProcess['id']>) => {
            const processId = action.payload;

            const process = state.byId[processId];
            if (process) {
                delete state.byId[processId]
                state.allIds.filter((id) => id !== action.payload)
                return
            }
            throw new Error(`process ${processId} not found`)
        }
    },
})

export const { spawnProcess, killProcess } = processSlice.actions

export default processSlice.reducer
