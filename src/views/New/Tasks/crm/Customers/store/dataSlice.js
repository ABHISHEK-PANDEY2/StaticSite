import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    addTask,
    getAllTasks,
    getAllUserDetails,
} from 'configs/firebase.config'
import {
    apiGetCrmCustomers,
    apPutCrmCustomer,
    apiGetCrmCustomersStatistic,
} from 'services/CrmService'

export const getUsers = createAsyncThunk(
    'crmCustomers/data/getCustomerStatistic',
    async () => {
        const response = await getAllUserDetails()
        return response
    }
)

export const getCustomers = createAsyncThunk(
    'crmCustomers/data/getCustomers',
    async (params) => {
        const response = await getAllTasks()
        return response
    }
)

export const putCustomer = createAsyncThunk(
    'crmCustomers/data/putCustomer',
    async (data) => {
        console.log('adding task')
        const response = await addTask(data)
        return response
    }
)

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'crmCustomers/data',
    initialState: {
        loading: false,
        customerList: [],
        usersData: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getCustomers.fulfilled]: (state, action) => {
            state.customerList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getCustomers.pending]: (state) => {
            state.loading = true
        },
        [getUsers.pending]: (state) => {
            state.usersLoading = true
        },
        [getUsers.fulfilled]: (state, action) => {
            state.usersData = action.payload
            state.usersLoading = false
        },
    },
})

export const { setTableData, setCustomerList, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
