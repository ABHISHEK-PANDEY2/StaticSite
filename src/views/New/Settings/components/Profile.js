import React, { useEffect, useState } from 'react'
import {
    Input,
    Button,
    Notification,
    toast,
    FormContainer,
    Avatar,
    Upload,
} from 'components/ui'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import { components } from 'react-select'
import {
    HiOutlineUserCircle,
    HiOutlineMail,
    HiPhone,
    HiOutlineBookOpen,
    HiOutlineUser,
} from 'react-icons/hi'
import * as Yup from 'yup'
import {
    getProfileDetailsbyID,
    updateProfileDetails,
    uploadToStorage,
} from 'configs/firebase.config'

const { Control } = components

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name Required'),
    lastname: Yup.string().required('Last Name Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    phonenumber: Yup.string()
        .required('Please enter your Phone Number')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits'),
    //address: Yup.string().required("Please enter your Address"),
})

const Profile = ({ data }) => {
    const [profileData, setProfileData] = useState({})
    const [reffralCode, setReffralCode] = useState()
    const [userPhotoURL, setUserPhotoURL] = useState('')

    useEffect(() => {
        ;(async () => {
            const profileDetails = await getProfileDetailsbyID()
            setProfileData(profileDetails)
        })()
    }, [])

    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
        let currentUserUID = localStorage.getItem('userID')
        if (file[0] && currentUserUID) {
            uploadToStorage(
                file[0],
                `profiles/uploads/${currentUserUID}`,
                async (uploadTask) => {
                    try {
                        const downloadURL =
                            await uploadTask.snapshot.ref.getDownloadURL()
                        setUserPhotoURL(downloadURL)
                        if (downloadURL) {
                            toast.push(
                                <Notification
                                    title={'Profile Picture Updated '}
                                    type="success"
                                />,
                                {
                                    placement: 'top-center',
                                }
                            )
                        }
                    } catch (err) {
                        toast.push(
                            <Notification title={err.message} type="danger" />,
                            {
                                placement: 'top-center',
                            }
                        )
                    }
                }
            )
        } else {
            toast.push(
                <Notification title={'Upload Failed!'} type="danger" />,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    const onFormSubmit = async (values, setSubmitting) => {
        const { phonenumber, firstname, lastname } = values
        let result = await updateProfileDetails(
            phonenumber,
            firstname,
            lastname,
            userPhotoURL
        )
        if (result === 'success') {
            toast.push(
                <Notification title={'Profile updated'} type="success" />,
                {
                    placement: 'top-center',
                }
            )
        } else {
            toast.push(
                <Notification
                    title={'Profile Not updated' + result}
                    type="danger"
                />,
                {
                    placement: 'top-center',
                }
            )
        }
        setSubmitting(false)
    }

    return (
        <>
            <Formik
                initialValues={{
                    email: profileData.email,
                    phonenumber: profileData.phone,
                    firstname: profileData.firstname,
                    lastname: profileData.lastname,
                }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    onFormSubmit(values, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting, resetForm }) => {
                    const validatorProps = { touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                                <FormDesription
                                    title="General"
                                    desc="Basic info, like your name and address that will displayed in public"
                                />
                                <FormRow
                                    name="avatar"
                                    label="Profile Image"
                                    {...validatorProps}
                                >
                                    <Field name="avatar">
                                        {({ field, form }) => {
                                            const avatarProps = field.value
                                                ? { src: field.value }
                                                : {}
                                            return (
                                                <Upload
                                                    className="cursor-pointer"
                                                    onChange={(files) =>
                                                        onSetFormFile(
                                                            form,
                                                            field,
                                                            files
                                                        )
                                                    }
                                                    onFileRemove={(files) =>
                                                        onSetFormFile(
                                                            form,
                                                            field,
                                                            files
                                                        )
                                                    }
                                                    showList={false}
                                                    uploadLimit={1}
                                                >
                                                    <Avatar
                                                        className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                        size={60}
                                                        shape="circle"
                                                        //icon={<HiOutlineUser />}
                                                        src={profileData.photoURL}
                                                        {...avatarProps}
                                                    />
                                                </Upload>
                                            )
                                        }}
                                    </Field>
                                </FormRow>
                                <FormRow
                                    name="email"
                                    label="Email"
                                    {...validatorProps}
                                    disable
                                >
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="Email"
                                        component={Input}
                                        disabled={true}
                                        prefix={
                                            <HiOutlineMail className="text-xl" />
                                        }
                                    />
                                </FormRow>
                                <FormRow
                                    name="firstname"
                                    label="First Name"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="firstname"
                                        placeholder="First Name"
                                        component={Input}
                                        prefix={
                                            <HiOutlineUserCircle className="text-xl" />
                                        }
                                    />
                                </FormRow>
                                <FormRow
                                    name="lastname"
                                    label="Last Name"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="lastname"
                                        placeholder="Last Name"
                                        component={Input}
                                        prefix={
                                            <HiOutlineUserCircle className="text-xl" />
                                        }
                                    />
                                </FormRow>
                                <FormRow
                                    name="Phone Number"
                                    label="Phone Number"
                                    {...validatorProps}
                                    border={false}
                                    errorMessage={errors.phonenumber}
                                >
                                    <Field
                                        type="number"
                                        autoComplete="off"
                                        name="phonenumber"
                                        placeholder="Phone Number"
                                        component={Input}
                                        prefix={<HiPhone className="text-xl" />}
                                    />
                                </FormRow>
                                <div className="mt-4 ltr:text-right">
                                    <Button
                                        className="ltr:mr-2 rtl:ml-2"
                                        type="button"
                                        onClick={resetForm}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        variant="solid"
                                        loading={isSubmitting}
                                        type="submit"
                                    >
                                        {isSubmitting ? 'Updating' : 'Update'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default Profile
