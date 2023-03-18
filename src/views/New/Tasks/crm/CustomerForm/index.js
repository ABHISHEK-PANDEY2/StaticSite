import React, { forwardRef, useState, useEffect } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik, useFormikContext } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import SocialLinkForm from './SocialLinkForm'

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    title: Yup.string().required('title Required'),
    assignee: Yup.string().required('User assignee Required'),
    description: Yup.string(),
    status: Yup.string(),
    phoneNumber: Yup.string().matches(
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
        'Phone number is not valid'
    ),
    deadline: Yup.string(),
    facebook: Yup.string(),
    twitter: Yup.string(),
    pinterest: Yup.string(),
    linkedIn: Yup.string(),
    img: Yup.string(),
})

const { TabNav, TabList, TabContent } = Tabs

const CustomerForm = forwardRef((props, ref) => {
    const { customer, onFormSubmit } = props
    const [assignee, setAssignee] = useState('')
    const formik = useFormikContext()

    useEffect(() => {
        setAssignee(customer.assignee)
    }, [])

    function formatDateTime(dateString) {
        let date = dateString.toString()
        let Slicestring = date.slice(0, 2)
        let parsed
        if (Slicestring === 'Ti') {
            parsed = dayjs(dateString.toDate())
        } else {
            parsed = dayjs(dateString)
        }
        let Date = dayjs(parsed.$d).format('DD/MM/YYYY')
        return Date
    }

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                assignee: customer.assignee || '',
                title: customer.title || '',
                img: customer.img || '',
                description: customer.description || '',
                status: customer.status || '',
                deadline:
                    customer?.deadline &&
                    dayjs(
                        formatDateTime(customer.deadline),
                        'DD/MM/YYYY'
                    ).toDate(),
                facebook: customer?.personalInfo?.facebook || '',
                twitter: customer?.personalInfo?.twitter || '',
                pinterest: customer?.personalInfo?.pinterest || '',
                linkedIn: customer?.personalInfo?.linkedIn || '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.({ ...values, assignee: assignee })
                setSubmitting(false)
            }}
        >
            {({ touched, errors, resetForm }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    Personal Info
                                </TabNav>
                                <TabNav value="social">Social</TabNav>
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    <PersonalInfoForm
                                        touched={touched}
                                        errors={errors}
                                        assignee={assignee}
                                        setAssignee={setAssignee}
                                    />
                                </TabContent>
                                <TabContent value="social">
                                    <SocialLinkForm
                                        touched={touched}
                                        errors={errors}
                                    />
                                </TabContent>
                            </div>
                        </Tabs>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

export default CustomerForm
