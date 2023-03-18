import {
    Input,
    Card,
    Button,
    Radio,
    FormItem,
    FormContainer,
    Avatar,
    Dialog,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import AndroidIcon from '../../../assets/images/Quote/Android.png'
import IOSIcon from '../../../assets/images/Quote/ios.png'
import ReactIcon from '../../../assets/images/Quote/React.png'

const validationSchema = Yup.object().shape({
    projectname: Yup.string().required('Website Name Required'),
    projectdetails: Yup.string().required('Website Details Required'),
})

const GetQuote = ({
    data = {
        projectname: '',
        projectdetails: '',
    },
    onNextChange,
    currentStepStatus,
}) => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [FundedStartup, setFundedStartup] = useState('Funded')
    const [Budget, setBudget] = useState('Low')
    const [PlateForm, setPlateForm] = useState('React.js')

    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'personalInformation', setSubmitting)
    }

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Website Information</h3>
                <p>Fill basic information about Website </p>
            </div>
            <Formik
                initialValues={data}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        setIsOpen(true)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <FormItem
                                    label="Website Name"
                                    invalid={
                                        errors.projectname &&
                                        touched.projectname
                                    }
                                    errorMessage={errors.projectname}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="projectname"
                                        placeholder="Website Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Website Description"
                                    invalid={
                                        errors.projectdetails &&
                                        touched.projectdetails
                                    }
                                    errorMessage={errors.projectdetails}
                                >
                                    <Input
                                        name="projectdetails"
                                        textArea
                                        placeholder="Write the description of the website, don't forget to mention the features required."
                                    />
                                </FormItem>
                                <FormItem label="Are you funded startup or bootstrapped?">
                                    <Radio.Group
                                    value={FundedStartup}
                                    onChange={(e) => setFundedStartup(e)}
                                    >
                                        <Radio value={'Funded'}>Funded</Radio>
                                        <Radio value={'Bootstrapped'}>
                                            Bootstrapped
                                        </Radio>
                                    </Radio.Group>
                                </FormItem>
                                <FormItem label="Monthly Budget?">
                                    <Radio.Group
                                    value={Budget}
                                    onChange={(e) => setBudget(e)}
                                    >
                                        <Radio value={'Low'}>Low</Radio>
                                        <Radio value={'High'}>High</Radio>
                                    </Radio.Group>
                                </FormItem>
                                <FormItem label="What are the platforms that you are planning to develop?">
                                    <Radio.Group
                                    value={PlateForm}
                                    onChange={(e) => setPlateForm(e)}
                                    >
                                        {/* <Card>
                                            <div className="px-3 py-3 flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    <Radio
                                                        value={'Java'}
                                                    ></Radio>
                                                    <div>
                                                        <Avatar
                                                            className="mr-4"
                                                            src={AndroidIcon}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    Native Java/Kotlin Android
                                                </div>
                                            </div>
                                        </Card>
                                        &nbsp;&nbsp;&nbsp;
                                        <Card>
                                            <div className="px-3 py-3 flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    <Radio
                                                        value={'Swift'}
                                                    ></Radio>
                                                    <div>
                                                        <Avatar
                                                            className="mr-4"
                                                            src={IOSIcon}
                                                        />
                                                    </div>
                                                </div>
                                                <div>Native SWIFT iOS App</div>
                                            </div>
                                        </Card>
                                        &nbsp;&nbsp;&nbsp; */}
                                        <Card>
                                            <div className="px-3 py-3 flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    <Radio
                                                        value={'React.js'}
                                                    ></Radio>
                                                    <div>
                                                        <Avatar
                                                            className="mr-4"
                                                            src={ReactIcon}
                                                        />
                                                    </div>
                                                </div>
                                                <div>Website</div>
                                            </div>
                                        </Card>
                                    </Radio.Group>
                                </FormItem>

                                <div className="flex justify-end gap-2">
                                    <Button
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {currentStepStatus === 'complete'
                                            ? 'Save'
                                            : 'Create Website'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={() => setIsOpen(false)}
                onRequestClose={() => setIsOpen(false)}
            >
                <h5 className="mb-4">Requirement Sent to Agencies.</h5>
                <p>
                    Your requirement has been sent to agencies. Why don't you
                    subscribe for DeveloperPass and get unlimited development &
                    design work for fixed pricing?
                </p>
                <div className="text-right mt-6">
                    <Button variant="solid" onClick={() => setIsOpen(false)}>
                        Check Pricing
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default GetQuote
