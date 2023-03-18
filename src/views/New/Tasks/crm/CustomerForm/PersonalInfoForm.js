import React, { useEffect, useState } from 'react'
import {
    DatePicker,
    Input,
    Tooltip,
    FormItem,
    Dropdown,
    Avatar,
    Upload,
} from 'components/ui'
import {
    HiUserCircle,
    HiMail,
    HiLocationMarker,
    HiPhone,
    HiCake,
    HiOutlineUser,
    HiBookmark,
    HiOutlineDocument,
    HiDocumentText,
    HiTerminal,
    HiOutlineCheck,
    HiOutlinePlus,
} from 'react-icons/hi'

import { Field, useFormikContext } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../Customers/store/dataSlice'

const PersonalInfoForm = (props) => {
    const dispatch = useDispatch()
    const { touched, errors, setAssignee, assignee } = props
    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }
    useEffect(() => {
        dispatch(getUsers())
        console.log('users', users)
    }, [])

    const formik = useFormikContext()

    useEffect(() => {
        formik.setFieldValue('assignee', assignee)
    }, [assignee])

    const users = useSelector((state) => state.crmCustomers.data.usersData)
    const AddMoreMember = () => {
        return (
            <Tooltip title="Add More">
                <Avatar className="cursor-pointer" shape="circle" size={30}>
                    <HiOutlinePlus />
                </Avatar>
            </Tooltip>
        )
    }
    const onAddAssignee = async (data) => {
        const userdata = await JSON.parse(data)
        console.log(userdata)
        setAssignee(userdata.name)
    }

    return (
        <>
            <div className="mt-4">
                <div className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                    Assigned to:
                </div>
                {users.length && (
                    <Dropdown renderTitle={<AddMoreMember />}>
                        {users.map((user, i) => {
                            return (
                                <Dropdown.Item
                                    onSelect={onAddAssignee}
                                    eventKey={JSON.stringify({
                                        id: user.uid,
                                        name: user.fullname,
                                    })}
                                    key={user.fullname}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Avatar
                                                shape="circle"
                                                size={22}
                                                src={user.photoURL}
                                            />
                                            <span className="ml-2 rtl:mr-2">
                                                {user.fullname}
                                            </span>
                                        </div>
                                    </div>
                                </Dropdown.Item>
                            )
                        })}
                    </Dropdown>
                )}
            </div>
            <FormItem
                label="Assignee"
                // invalid={errors.name && touched.name}
                // errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="assignee"
                    placeholder="Assignee"
                    component={Input}
                    disabled={true}
                    value={assignee}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Title"
                // invalid={errors.email && touched.email}
                // errorMessage={errors.email}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="title"
                    placeholder="Title"
                    component={Input}
                    prefix={<HiBookmark className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Description"
                // invalid={errors.location && touched.location}
                // errorMessage={errors.location}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="description"
                    placeholder="Description"
                    component={Input}
                    prefix={<HiDocumentText className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Status"
                // invalid={errors.title && touched.title}
                // errorMessage={errors.title}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="status"
                    placeholder="Status"
                    component={Input}
                    prefix={<HiOutlineCheck className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Deadline"
                // invalid={errors.birthday && touched.birthday}
                // errorMessage={errors.birthday}
            >
                <Field name="deadline" placeholder="Deadline">
                    {({ field, form }) => (
                        <DatePicker
                            field={field}
                            form={form}
                            value={field.value}
                            prefix={<HiCake className="text-xl" />}
                            onChange={(date) => {
                                form.setFieldValue(field.name, date)
                            }}
                        />
                    )}
                </Field>
            </FormItem>
        </>
    )
}

export default PersonalInfoForm
