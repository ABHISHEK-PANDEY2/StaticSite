import React from 'react'
import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Alert,
    Radio,
} from 'components/ui'
import { PasswordInput, ActionLink, RadioGroup } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
import { useState } from 'react'

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Please enter your first name'),
    lastname: Yup.string().required('Please enter your last name'),
    phone: Yup.string()
        .required('Please enter your Phone Number')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
    // confirmPassword: Yup.string().oneOf(
    //     [Yup.ref('password'), null],
    //     'Your passwords do not match'
    // ),
})

const SignUpForm = (props) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props
    const [userType, setUserType] = useState('Clients')

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (values, setSubmitting) => {
        const { firstname,lastname, password, email,phone } = values
        setSubmitting(true)
        const result = await signUp({ firstname,lastname, password, email, userType,phone })

        if (result.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: '',
                    password:'',
                    type: 'Clients',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <FormItem
                                    label="First Name"
                                    invalid={
                                        errors.firstname && touched.firstname
                                    }
                                    errorMessage={errors.firstname}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="firstname"
                                        placeholder="First Name"
                                        component={Input}
                                    />
                                </FormItem>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <FormItem
                                    label="Last Name"
                                    invalid={
                                        errors.lastname && touched.lastname
                                    }
                                    errorMessage={errors.lastname}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="lastname"
                                        placeholder="Last Name"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <FormItem
                                label="Email"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Phone Number"
                                invalid={errors.phone && touched.phone}
                                errorMessage={errors.phone}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="phone"
                                    placeholder="Phone Number"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Password"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            {/* <FormItem
                                label="Confirm Password"
                                invalid={
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                }
                                errorMessage={errors.confirmPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    component={PasswordInput}
                                />
                            </FormItem> */}
                            <FormItem label="I am Looking For:">
                                <Radio.Group
                                    value={userType}
                                    onChange={(e) => setUserType(e)}
                                >
                                    <Radio value={'Clients'}>Clients</Radio>
                                    <Radio value={'Designers & Developers'}>
                                        Designers & Developers
                                    </Radio>
                                </Radio.Group>
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                style={{backgroundColor:'#006D77',color:'white'}}
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : 'Sign Up'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>Already have an account? </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
