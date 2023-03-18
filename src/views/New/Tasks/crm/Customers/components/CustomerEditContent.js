import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from '../../CustomerForm'
import dayjs from 'dayjs'

const CustomerEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmCustomers.state.selectedCustomer
    )
    const tasks = useSelector((state) => state.crmCustomers.data.customerList)
    const { id } = customer

    const onFormSubmit = (values) => {
        const { assignee, title, deadline, status, description } = values

        const data = {
            assignee,
            title,
            deadline,
            status,
            description,
            created_on: new Date(),
        }

        console.log(data)
        dispatch(putCustomer(data))
        dispatch(setDrawerClose())
        dispatch(setCustomerList([...tasks, data]))
    }

    return (
        <CustomerForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            customer={customer}
        />
    )
})

export default CustomerEditContent
