import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Spinner, Card, Avatar } from 'components/ui'
import {
    Button,
    Dialog,
    Input,
    FormItem,
    FormContainer,
    Notification,
    toast,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { HiOutlinePlus } from 'react-icons/hi'
import { createTeam, getTeamsbyuserID } from 'configs/firebase.config'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const validationSchema = Yup.object().shape({
    teamname: Yup.string().required('Please enter Team name'),
    teamdescription: Yup.string().required('Please enter Team Description'),
})

const TeamList = () => {
    const disableSubmit = false
    const navigate = useNavigate()
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [teams, setTeams] = useState(undefined)

    useEffect(() => {
        GetAllTeams()
    }, [])

    const GetAllTeams = async () => {
        let response = await getTeamsbyuserID()
        setTeams(response)
    }

    const onCreateTeam = async (values, setSubmitting) => {
        const { teamname, teamdescription } = values
        setSubmitting(true)
        const result = await createTeam(teamname, teamdescription)
        let team_id = result.team_id
        if (result.status === 'success') {
            openNotification('success', 'SuccessFully Teams Created')
            navigate('/home/team-details', {
                state: {
                    id: result.team_id,
                    name: teamname,
                    des: teamdescription,
                },
            })
        } else {
            openNotification('danger', result)
        }

        setSubmitting(false)
    }

    const openNotification = (type, message) => {
        toast.push(<Notification type={type}>{message}</Notification>)
    }

    return (
        <div className={classNames('mt-6 h-full flex flex-col')}>
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Manage Teams</h3>
            </div>
            {teams !== undefined && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <Card
                        bodyClass="h-full"
                        style={{ display: 'flex', flexDirection: 'columns' }}
                    >
                        <a
                            onClick={() => {
                                setIsOpen(true)
                            }}
                        >
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
                                Create Team
                            </p>
                        </a>
                    </Card>
                    {/*create teams dialog*/}
                    <Dialog
                        isOpen={dialogIsOpen}
                        onClose={() => {
                            setIsOpen(false)
                        }}
                        onRequestClose={() => {
                            setIsOpen(false)
                        }}
                    >
                        <Formik
                            initialValues={{
                                teamname: '',
                                teamdescription: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                if (!disableSubmit) {
                                    onCreateTeam(values, setSubmitting)
                                } else {
                                    setSubmitting(false)
                                }
                            }}
                        >
                            {({ touched, errors, isSubmitting }) => (
                                <Form>
                                    <FormContainer>
                                        <FormItem
                                            label="Team Name"
                                            invalid={
                                                errors.teamname &&
                                                touched.teamname
                                            }
                                            errorMessage={errors.teamname}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="teamname"
                                                placeholder="Team Name"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Team Description"
                                            invalid={
                                                errors.teamdescription &&
                                                touched.teamdescription
                                            }
                                            errorMessage={
                                                errors.teamdescription
                                            }
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="teamdescription"
                                                placeholder="Team Description"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <Button
                                            block
                                            loading={isSubmitting}
                                            variant="solid"
                                            type="submit"
                                        >
                                            {isSubmitting
                                                ? 'Creating Teams...'
                                                : 'Create Team '}
                                        </Button>
                                    </FormContainer>
                                </Form>
                            )}
                        </Formik>
                    </Dialog>
                    {teams !== undefined &&
                        teams.map((data) => (
                            <Card>
                                {' '}
                                <div className="py-2 px-3 flex items-center gap-2">
                                    <div>
                                        <div className="font-bold text-gray-900 dark:text-gray-100">
                                            {data.team_name}
                                        </div>
                                        <div className="text-xs">
                                            {data.team_description}
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="py-3 flex items-center justify-center">
                                    <div className="flex items-center gap-1">
                                        <Button
                                            onClick={() =>
                                                navigate('/team-details', {
                                                    state: {
                                                        id: data.team_id,
                                                        name: data.team_name,
                                                        des: data.team_description,
                                                    },
                                                })
                                            }
                                            size="sm"
                                            variant="solid"
                                        >
                                            Show Members
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                </div>
            )}
        </div>
    )
}

export default TeamList
