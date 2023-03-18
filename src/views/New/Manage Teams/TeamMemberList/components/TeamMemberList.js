import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import {
    Spinner,
    Card,
    Avatar,
    Notification,
    toast,
    Button,
    Dialog,
    Select,
    FormItem,
    FormContainer,
    Input,
} from 'components/ui'
import { toggleNewProjectDialog } from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlinePlus } from 'react-icons/hi'
import {
    getTeamMembersDetailsbyTeamID,
    DeleteUserFromTeam,
    EditUserRoleInTeam,
    inviteUserIntoTeam,
} from 'configs/firebase.config'
import { useLocation } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import { HiPencilAlt } from 'react-icons/hi'
import { AiFillDelete } from 'react-icons/ai'
import dayjs from 'dayjs'

import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter email'),
})

const roleOptions = [
    { value: 'viewer', label: 'Viewer' },
    { value: 'editor', label: 'Editor' },
]

const TeamMemberList = () => {
    const [teamsMembers, setTeamMembers] = useState([])
    const disableSubmit = false
    const [deletedialogIsOpen, setDeletedialogIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [role, setrole] = useState('viewer')
    const [teamMemberData, setTeamMemberData] = useState()

    const dispatch = useDispatch()

    const loading = useSelector((state) => state.projectList.data.loading)

    const onAddNewProject = () => {
        dispatch(toggleNewProjectDialog(true))
    }

    const location = useLocation()
    let team_id = location.state.id // 'At6KlCFZlgu7RhQZO5vu' //
    let team_name = location.state.name //'trojan horses' //
    let team_description = location.state.des //'trojan horses' //
    let currentUserUID = localStorage.getItem('userID')

    const InviteUser = async (values, setSubmitting) => {
        const { email } = values

        const res = await inviteUserIntoTeam(
            email,
            role,
            team_id,
            team_name,
            team_description
        )

        if (res === 'success') {
            toast.push(
                <Notification type="success">
                    Successfully Invited to this User : {email}
                </Notification>
            )
        } else {
            toast.push(
                <Notification type="danger">
                    Can`t Find This User : {email} Please Create Account first
                </Notification>
            )
        }
        setSubmitting(false)
        setIsOpen(false)
    }

    const DeleteMember = async () => {
        let Delete = await DeleteUserFromTeam(teamMemberData)
        if (Delete === 'success') {
            toast.push(
                <Notification type="success">
                    Successfully Deleted User
                </Notification>
            )
        } else {
            toast.push(
                <Notification type="danger">Can`t Delete User</Notification>
            )
        }
        setDeletedialogIsOpen(false)
    }

    const EditMember = async (values, setSubmitting) => {
        console.log(values)
        const { email } = values
        console.log('updatedrole')
        console.log(role)
        let Edit = await EditUserRoleInTeam(teamMemberData, role)
        if (Edit == 'success') {
            toast.push(
                <Notification type="success">
                    Successfully Updated Users Role As a : {role}
                </Notification>
            )
        } else {
            toast.push(
                <Notification type="danger">
                    Can`t Users Role : {email}
                </Notification>
            )
        }

        setSubmitting(false)
        setIsOpen(false)
        setIsEdit(false)
    }

    useEffect(() => {
        ;(async () => {
            let teamDetails = await getTeamMembersDetailsbyTeamID(team_id)
            console.log('teamDetails')
            console.log(teamDetails)

            setTeamMembers(teamDetails)
        })()
    }, [dialogIsOpen, deletedialogIsOpen])

    return (
        <div
            className={classNames(
                'mt-6 h-full flex flex-col',
                loading && 'justify-center'
            )}
        >
            {loading && (
                <div className="flex justify-center">
                    <Spinner size={40} />
                </div>
            )}

            {teamsMembers.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <Card
                        bodyClass="h-full"
                        style={{ display: 'flex', flexDirection: 'columns' }}
                    >
                        <a onClick={() => setIsOpen(true)}>
                            <Avatar
                                shape="circle"
                                className="mr-4 bg-emerald-600"
                                icon={<HiOutlinePlus />}
                                style={{ marginLeft: '50%', marginTop: '40%' }}
                            />
                            <p
                                style={{
                                    marginTop: '10px',
                                    marginLeft: '40px',
                                }}
                            >
                                Add Team Member
                            </p>
                        </a>
                    </Card>
                    {teamsMembers.map((project) => (
                        <Card>
                            {' '}
                            <div className="py-2 px-3 flex items-center gap-2">
                                <Avatar
                                    size={40}
                                    shape="circle"
                                    src="/img/avatars/thumb-10.jpg"
                                />
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-gray-100">
                                        {project.invited_person_email}
                                    </div>
                                    <div className="text-xs">
                                        ReactJS Developer
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="px-3 py-3">
                                {project.acceptence_status === 'accepted' ? (
                                    <p
                                        className="capitalize"
                                        style={{
                                            color: '#00FF00',
                                        }}
                                    >
                                        &#x2022; {project.acceptence_status}
                                    </p>
                                ) : (
                                    <p
                                        className="capitalize"
                                        style={{
                                            color: 'red',
                                        }}
                                    >
                                        &#x2022; {project.acceptence_status}
                                    </p>
                                )}
                                <p>{project.invited_role}</p>

                                <h6 className="text-sm font-bold mt-2">
                                    Joined At{' '}
                                </h6>
                                <span>
                                    {dayjs(project?.updated_on.toDate()).format(
                                        'DD/MM/YYYY'
                                    )}
                                </span>
                            </div>
                            <div className="py-3 flex items-center justify-end">
                                <div className="flex items-center gap-1">
                                    {project.invited_role !== 'Owner' && (
                                        <>
                                            <Button
                                                onClick={async () => {
                                                    setIsOpen(true)
                                                    setIsEdit(true)
                                                    setTeamMemberData(project)
                                                }}
                                                size="sm"
                                            >
                                                <HiPencilAlt />
                                                {/* Edit */}
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setDeletedialogIsOpen(true)
                                                    setTeamMemberData(project)
                                                }}
                                                size="sm"
                                                variant="solid"
                                            >
                                                <AiFillDelete />
                                                {/* Delete */}
                                            </Button>
                                        </>
                                    )}
                                    <Dialog
                                        isOpen={dialogIsOpen}
                                        onClose={() => setIsOpen(false)}
                                        onRequestClose={() => setIsOpen(false)}
                                    >
                                        <h5 className="mb-4">
                                            {isEdit
                                                ? 'Edit Member'
                                                : 'Invite Member'}
                                        </h5>
                                        <Formik
                                            initialValues={{
                                                email: isEdit
                                                    ? project.invited_person_email
                                                    : '',
                                                role: '',
                                            }}
                                            validationSchema={validationSchema}
                                            onSubmit={(
                                                values,
                                                { setSubmitting }
                                            ) => {
                                                if (!disableSubmit) {
                                                    console.log('values')
                                                    console.log(values)
                                                    if (isEdit) {
                                                        EditMember(
                                                            values,
                                                            setSubmitting
                                                        )
                                                    } else {
                                                        InviteUser(
                                                            values,
                                                            setSubmitting
                                                        )
                                                    }
                                                } else {
                                                    setSubmitting(false)
                                                }
                                            }}
                                        >
                                            {({
                                                touched,
                                                errors,
                                                isSubmitting,
                                            }) => (
                                                <Form>
                                                    <FormContainer>
                                                        <FormItem
                                                            label="Email"
                                                            invalid={
                                                                errors.email &&
                                                                touched.email
                                                            }
                                                            errorMessage={
                                                                errors.email
                                                            }
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="email"
                                                                disabled={
                                                                    isEdit
                                                                }
                                                                placeholder="Email"
                                                                component={
                                                                    Input
                                                                }
                                                            />
                                                        </FormItem>
                                                        <FormItem
                                                            label="Role"
                                                            invalid={
                                                                errors.role &&
                                                                touched.role
                                                            }
                                                            errorMessage={
                                                                errors.role
                                                            }
                                                        >
                                                            <Select
                                                                onChange={(e) =>
                                                                    setrole(
                                                                        e.value
                                                                    )
                                                                }
                                                                name="role"
                                                                placeholder="Please Select"
                                                                options={
                                                                    roleOptions
                                                                }
                                                            ></Select>
                                                        </FormItem>
                                                        <Button
                                                            block
                                                            loading={
                                                                isSubmitting
                                                            }
                                                            variant="solid"
                                                            type="submit"
                                                        >
                                                            {isSubmitting
                                                                ? isEdit
                                                                    ? 'Updating...'
                                                                    : 'Inviting..'
                                                                : isEdit
                                                                ? 'Edit Member'
                                                                : 'Add Member'}
                                                        </Button>
                                                    </FormContainer>
                                                </Form>
                                            )}
                                        </Formik>
                                    </Dialog>
                                    <Dialog
                                        isOpen={deletedialogIsOpen}
                                        onClose={() =>
                                            setDeletedialogIsOpen(false)
                                        }
                                        onRequestClose={() =>
                                            setDeletedialogIsOpen(false)
                                        }
                                    >
                                        <h5 className="mb-4">Delete Member</h5>
                                        <p>
                                            Are You Sure You Want to Delete this
                                            User
                                        </p>

                                        <div className="text-right mt-6">
                                            <Button
                                                size="sm"
                                                onClick={DeleteMember}
                                            >
                                                Yes
                                            </Button>
                                            &nbsp;&nbsp;&nbsp;
                                            <Button
                                                size="sm"
                                                variant="solid"
                                                onClick={() => {
                                                    setDeletedialogIsOpen(false)
                                                }}
                                            >
                                                No
                                            </Button>
                                        </div>
                                    </Dialog>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TeamMemberList
