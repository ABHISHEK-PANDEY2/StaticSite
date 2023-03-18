import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    getBoardData,
    GetAllMembers,
    GetAllBoardMembers,
} from 'configs/firebase.config'
import {
    apiGetScrumBoards,
    apiGetScrumBoardtMembers,
} from 'services/ProjectService'

export const getBoards = createAsyncThunk('scrumBoard/getBoards', async () => {
    const response = await getBoardData()
    return response
})

export const getMembers = createAsyncThunk(
    'scrumBoard/getMembers',
    async () => {
        const allMember = await GetAllMembers()
        const response = await GetAllBoardMembers()

        return { allMembers: allMember, participantMembers: response }
    }
)

const dataSlice = createSlice({
    name: 'scrumBoard/data',
    initialState: {
        loading: false,
        columns: {},
        ordered: [],
        boardMembers: [],
        allMembers: [],
    },
    reducers: {
        updateOrdered: (state, action) => {
            state.ordered = action.payload
        },
        updateColumns: (state, action) => {
            state.columns = action.payload
        },
        updateBoardMembers: (state, action) => {
            state.boardMembers = action.payload
        },
    },
    extraReducers: {
        [getBoards.fulfilled]: (state, { payload }) => {
            state.columns = payload.columnData
            state.ordered = payload.orderedData //Object.keys(payload.orderedData)
            state.loading = false
        },
        [getBoards.pending]: (state) => {
            state.loading = true
        },
        [getMembers.fulfilled]: (state, action) => {
            state.boardMembers = action.payload.participantMembers
            state.allMembers = action.payload.allMembers
        },
    },
})

export const { updateOrdered, updateColumns, updateBoardMembers } =
    dataSlice.actions

export default dataSlice.reducer
