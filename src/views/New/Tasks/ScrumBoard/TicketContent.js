import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateColumns } from './store/dataSlice'
import {
    Spinner,
    Avatar,
    Tooltip,
    Card,
    Button,
    Input,
    Dropdown,
    Tag,
    Badge,
    FormItem,
    FormContainer,
    Dialog,
    Upload,
    Notification,
    toast,
    Select,
} from 'components/ui'
import UsersAvatarGroup from 'components/shared/UsersAvatarGroup'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import {
    HiOutlinePlus,
    HiOutlineCheckCircle,
    HiOutlineClipboardList,
    HiOutlinePaperClip,
    HiOutlineDownload,
    HiOutlineTrash,
    HiOutlineChatAlt,
    HiX,
} from 'react-icons/hi'
import { AiFillEdit } from 'react-icons/ai'
import isEmpty from 'lodash/isEmpty'
import { createUID, taskLabelColors, labelList } from './utils'
import {
    addDescriptionInCard,
    addLabelInCard,
    addMemberInCard,
    addCommentInCard,
    addAttchmentInCard,
    uploadToStorage,
    moveCardInColumnInBoard,
    generateRandomString,
} from 'configs/firebase.config'
import requiredFieldValidation from 'utils/requiredFieldValidation'
import { Formik, Field, Form } from 'formik'

export const createCommentObject = (message) => {
    return {
        id: createUID(10),
        name: localStorage.getItem('username'),
        src: localStorage.getItem('profileImage'),
        message: message,
        date: new Date(),
    }
}

const TicketSection = ({
    title,
    icon,
    children,
    titleSize: Title = 'h6',
    ticketClose,
}) => {
    return (
        <div className="flex mb-10">
            <div className="text-2xl">{icon}</div>
            <div className="ml-2 rtl:mr-2 w-full">
                <div className="flex justify-between">
                    <Title>{title}</Title>
                    {ticketClose && (
                        <Button
                            size="sm"
                            shape="circle"
                            variant="plain"
                            icon={<HiX className="text-lg" />}
                            onClick={() => ticketClose()}
                        />
                    )}
                </div>
                {children}
            </div>
        </div>
    )
}

const AddMoreMember = () => {
    return (
        <Tooltip title="Add More">
            <Avatar className="cursor-pointer" shape="circle" size={30}>
                <HiOutlinePlus />
            </Avatar>
        </Tooltip>
    )
}

const TicketContent = ({ onTicketClose }) => {
    const ticketId = useSelector((state) => state.scrumBoard.state.ticketId)
    const columns = useSelector((state) => state.scrumBoard.data.columns)
    const orderedList = useSelector((state) => state.scrumBoard.data.ordered)
    const selectedBoard = useSelector((state) => state.scrumBoard.state.board)
    const boardMembers = useSelector(
        (state) => state.scrumBoard.data.boardMembers
    )

    const dispatch = useDispatch()

    const [ticketData, setTicketData] = useState({})
    const [loading, setLoading] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [attachmentsdialogOpen, setAttachmentsdialogOpen] = useState(false)
    const [attchmentURL, setattchmentURL] = useState('')
    const [attchmentData, setattchmentData] = useState('')

    let CommenterName = localStorage.getItem('username')
    let CommenterPhotoUrl = localStorage.getItem('profileImage')

    const commentInput = useRef()

    const getTicketDetail = async () => {
        setLoading(true)
        let ticketDetail = {}
        for (const key in columns) {
            if (Object.hasOwnProperty.call(columns, key)) {
                const board = columns[key]
                const result = board.find((ticket) => ticket.id === ticketId)
                if (result) {
                    ticketDetail = result
                }
            }
        }
        setTicketData(ticketDetail)
        setLoading(false)
    }

    useEffect(() => {
        if (isEmpty(ticketData)) {
            getTicketDetail()
        } else {
            onUpdateColumn()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticketData, ticketData])

    const submitComment = async () => {
        const message = commentInput.current.value
        const comment = createCommentObject(message)
        const comments = cloneDeep(ticketData.comments)
        comments.push(comment)
        commentInput.current.value = ''
        await addCommentInCard(
            message,
            CommenterName,
            CommenterPhotoUrl,
            ticketId,
            selectedBoard
        )
        setTicketData((prevState) => ({
            ...prevState,
            ...{ comments: comments },
        }))
    }

    const handleTicketClose = () => {
        onTicketClose?.()
    }

    const onUpdateColumn = () => {
        const data = cloneDeep(columns)
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const board = data[key]
                board.forEach((ticket, index) => {
                    if (ticket.id === ticketId) {
                        data[key][index] = ticketData
                    }
                })
            }
        }
        dispatch(updateColumns(data))
    }

    const onAddMemberClick = async (id) => {
        const newMember = boardMembers.find((member) => member.id === id)
        const members = cloneDeep(ticketData.members)
        members.push(newMember)

        setTicketData((prevState) => ({
            ...prevState,
            ...{ members: members },
        }))

        await addMemberInCard(members, ticketId, selectedBoard)
    }

    const onAddLabelClick = async (label) => {
        const labels = cloneDeep(ticketData.labels)
        labels.push(label)
        setTicketData((prevState) => ({ ...prevState, ...{ labels: labels } }))
        await addLabelInCard(label, ticketId, selectedBoard)
    }

    const onMoveColumnlClick = async (newColumnBoard) => {
        if (selectedBoard !== newColumnBoard) {
            await moveCardInColumnInBoard(
                selectedBoard,
                newColumnBoard,
                ticketId
            )
            handleTicketClose()
        } else {
            toast.push(
                <Notification
                    title={'You Can`t Move This Task to This Board.'}
                    type="danger"
                />,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    const onAddDescriptionClick = async (values, setSubmitting) => {
        const response = await addDescriptionInCard(
            values.description,
            ticketId,
            selectedBoard
        )
        setDialogOpen(false)
        setTicketData((prevState) => ({
            ...prevState,
            ...{ description: values.description },
        }))
        setSubmitting(false)
    }

    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
        let currentUserUID = localStorage.getItem('userID')
        setattchmentData(file[0])
        if (file[0] && currentUserUID) {
            uploadToStorage(
                file[0],
                `scrumboard/attchments/${currentUserUID}`,
                async (uploadTask) => {
                    try {
                        const downloadURL =
                            await uploadTask.snapshot.ref.getDownloadURL()
                        setattchmentURL(downloadURL)
                        if (downloadURL) {
                            toast.push(
                                <Notification
                                    title={'Attchment Updated '}
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

    const onAddAttchmentClick = async (values, setSubmitting) => {
        let AttachmentObject = {
            id: generateRandomString(),
            size: attchmentData.size,
            name: attchmentData.name,
            date: new Date(),
            update_on: new Date(),
            src: attchmentURL,
        }
        const response = await addAttchmentInCard(
            AttachmentObject,
            ticketId,
            selectedBoard
        )
        setAttachmentsdialogOpen(false)
        setSubmitting(false)

        const attachments = cloneDeep(ticketData.attachments)
        attachments.push(AttachmentObject)

        setTicketData((prevState) => ({
            ...prevState,
            ...{ attachments: attachments },
        }))
    }

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
        <>
            {loading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <Spinner size={40} />
                </div>
            ) : (
                <>
                    <div className="max-h-[700px] overflow-y-auto">
                        <TicketSection
                            title={ticketData.name}
                            icon={<HiOutlineCheckCircle />}
                            titleSize="h5"
                            ticketClose={handleTicketClose}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mt-4">
                                    <div className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                                        Assigned to:
                                    </div>
                                    <UsersAvatarGroup
                                        avatarProps={{
                                            className:
                                                'mr-1 rtl:ml-1 cursor-pointer',
                                        }}
                                        avatarGroupProps={{ maxCount: 4 }}
                                        chained={false}
                                        users={ticketData.members}
                                    />
                                    {boardMembers.length !==
                                        ticketData.members?.length && (
                                        <Dropdown
                                            renderTitle={<AddMoreMember />}
                                        >
                                            {boardMembers.map(
                                                (member) =>
                                                    !ticketData.members?.some(
                                                        (m) =>
                                                            m.id === member.id
                                                    ) && (
                                                        <Dropdown.Item
                                                            onSelect={
                                                                onAddMemberClick
                                                            }
                                                            eventKey={member.id}
                                                            key={member.name}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center">
                                                                    <Avatar
                                                                        shape="circle"
                                                                        size={
                                                                            22
                                                                        }
                                                                        src={
                                                                            member.img
                                                                        }
                                                                    />
                                                                    <span className="ml-2 rtl:mr-2">
                                                                        {
                                                                            member.name
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Dropdown.Item>
                                                    )
                                            )}
                                        </Dropdown>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <div className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                                        Label:
                                    </div>
                                    <div>
                                        {ticketData.labels?.map((label) => (
                                            <Tag
                                                key={label}
                                                className="mr-2 rtl:ml-2 mb-2"
                                                prefix
                                                prefixClass={`${taskLabelColors[label]}`}
                                            >
                                                {label}
                                            </Tag>
                                        ))}

                                        <Dropdown
                                            renderTitle={
                                                <Tag className="border-dashed cursor-pointer mr-2 rtl:ml-2">
                                                    Add Label
                                                </Tag>
                                            }
                                            placement="bottom-end"
                                        >
                                            {labelList.map(
                                                (label) =>
                                                    !ticketData.labels?.includes(
                                                        label
                                                    ) && (
                                                        <Dropdown.Item
                                                            onSelect={
                                                                onAddLabelClick
                                                            }
                                                            eventKey={label}
                                                            key={label}
                                                        >
                                                            <div className="flex items-center">
                                                                <Badge
                                                                    innerClass={`${taskLabelColors[label]}`}
                                                                />
                                                                <span className="ml-2 rtl:mr-2">
                                                                    {label}
                                                                </span>
                                                            </div>
                                                        </Dropdown.Item>
                                                    )
                                            )}
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </TicketSection>

                        {/* <TicketSection>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mt-4">
                                    <div className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                                        Status :
                                    </div>
                                    <div>
                                        <p>Move To:</p>
                                        <Select
                                            size="sm"
                                            placeholder="Please Select"
                                            options={orderedList.map(
                                                (value) => {
                                                    return {
                                                        value: value,
                                                        label: value,
                                                    }
                                                }
                                            )}
                                            onChange={(e) =>
                                                onMoveColumnlClick(e.value)
                                            }
                                        ></Select>
                                        
                                    </div>
                                </div>
                            </div>
                        </TicketSection> */}

                        <TicketSection
                            title={
                                <>
                                    Description
                                    <Button
                                        onClick={() => setDialogOpen(true)}
                                        size="sm"
                                        variant="plain"
                                    >
                                        <AiFillEdit />
                                    </Button>
                                </>
                            }
                            icon={<HiOutlineClipboardList size={29} />}
                        >
                            <div className="mt-2">
                                <p className="mt-2">
                                    {ticketData.description == undefined
                                        ? ''
                                        : ticketData.description}
                                </p>
                            </div>
                        </TicketSection>

                        <TicketSection
                            title={
                                <>
                                    Attachments
                                    <Button
                                        onClick={() =>
                                            setAttachmentsdialogOpen(true)
                                        }
                                        size="sm"
                                        variant="plain"
                                    >
                                        <AiFillEdit />
                                    </Button>
                                </>
                            }
                            icon={<HiOutlinePaperClip />}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                {ticketData?.attachments?.length > 0 &&
                                    ticketData.attachments.map((file) => (
                                        <Card
                                            bodyClass="px-2 pt-2 pb-1"
                                            key={file.id}
                                        >
                                            <img
                                                className="max-w-full rounded"
                                                alt={file.name}
                                                src={file.src}
                                            />
                                            <div className="mt-1 flex justify-between items-center">
                                                <div>
                                                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                                                        {file.name}
                                                    </div>
                                                    <span className="text-xs">
                                                        {file.size}
                                                    </span>
                                                </div>
                                                {/* <div className="flex items-center">
                                                    <Tooltip title="Download">
                                                        <Button
                                                            className="mr-1 rtl:ml-1"
                                                            variant="plain"
                                                            size="xs"
                                                            icon={
                                                                <HiOutlineDownload />
                                                            }
                                                        />
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <Button
                                                            variant="plain"
                                                            size="xs"
                                                            icon={
                                                                <HiOutlineTrash />
                                                            }
                                                        />
                                                    </Tooltip>
                                                </div> */}
                                            </div>
                                        </Card>
                                    ))}
                            </div>
                        </TicketSection>

                        <TicketSection
                            title="Comments"
                            icon={<HiOutlineChatAlt />}
                        >
                            <div className="mt-2 w-full">
                                {ticketData?.comments?.length > 0 && (
                                    <>
                                        {ticketData.comments.map((comment) => (
                                            <div
                                                className="mb-3 flex"
                                                key={comment.id}
                                            >
                                                <div className="mt-2">
                                                    <Avatar
                                                        shape="circle"
                                                        src={comment.src}
                                                    />
                                                </div>
                                                <div className="ml-2 rtl:mr-2 p-3 rounded w-100">
                                                    <div className="flex items-center mb-2">
                                                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                            {comment.name}
                                                        </span>
                                                        <span className="mx-1">
                                                            {' '}
                                                            |{' '}
                                                        </span>

                                                        <span>
                                                            {formatDateTime(
                                                                comment.date
                                                            )}
                                                        </span>
                                                    </div>
                                                    <p className="mb-0">
                                                        {comment.message}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                                <div className="mb-3 flex">
                                    <Avatar
                                        shape="circle"
                                        src={CommenterPhotoUrl}
                                    />
                                    <div className="ml-2 rtl:mr-2 px-3 rounded w-full">
                                        <Input
                                            ref={commentInput}
                                            placeholder="Write comment"
                                            suffix={
                                                <div
                                                    onClick={() =>
                                                        submitComment()
                                                    }
                                                    className="cursor-pointer font-weight-semibold text-primary"
                                                >
                                                    Send
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </TicketSection>
                    </div>
                    <div className="text-right mt-4">
                        <Button
                            className="mr-2 rtl:ml-2"
                            size="sm"
                            variant="plain"
                            onClick={() => handleTicketClose()}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            size="sm"
                            onClick={() => handleTicketClose()}
                        >
                            Change
                        </Button>
                        <Dialog
                            isOpen={dialogOpen}
                            onClose={() => setDialogOpen(false)}
                            onRequestClose={() => setDialogOpen(false)}
                        >
                            <h5>Description</h5>
                            <div className="mt-8">
                                <Formik
                                    initialValues={{
                                        description: ticketData.description,
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setSubmitting(true)
                                        onAddDescriptionClick(
                                            values,
                                            setSubmitting
                                        )
                                    }}
                                >
                                    {({ errors, touched, isSubmitting }) => (
                                        <Form>
                                            <FormContainer layout="inline">
                                                <FormItem
                                                    label="Description"
                                                    invalid={
                                                        errors.description &&
                                                        touched.description
                                                    }
                                                    errorMessage={
                                                        errors.description
                                                    }
                                                >
                                                    <Field
                                                        type="text"
                                                        name="description"
                                                        placeholder="Please enter Description"
                                                        component={Input}
                                                        validate={(value) =>
                                                            requiredFieldValidation(
                                                                value,
                                                                'Ticket title is required!'
                                                            )
                                                        }
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Button
                                                        loading={isSubmitting}
                                                        variant="solid"
                                                        type="submit"
                                                    >
                                                        Add
                                                    </Button>
                                                </FormItem>
                                            </FormContainer>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </Dialog>{' '}
                        <Dialog
                            isOpen={attachmentsdialogOpen}
                            onClose={() => setAttachmentsdialogOpen(false)}
                            onRequestClose={() =>
                                setAttachmentsdialogOpen(false)
                            }
                        >
                            <h5>Add Attachment</h5>
                            <div className="mt-8">
                                <Formik
                                    initialValues={{}}
                                    enableReinitialize
                                    onSubmit={(values, { setSubmitting }) => {
                                        setSubmitting(true)
                                        onAddAttchmentClick(
                                            values,
                                            setSubmitting
                                        )
                                    }}
                                >
                                    {({
                                        values,
                                        touched,
                                        errors,
                                        isSubmitting,
                                        resetForm,
                                    }) => {
                                        const validatorProps = {
                                            touched,
                                            errors,
                                        }
                                        return (
                                            <Form>
                                                <FormContainer>
                                                    <Field name="avatar">
                                                        {({ field, form }) => {
                                                            const avatarProps =
                                                                field.value
                                                                    ? {
                                                                          src: field.value,
                                                                      }
                                                                    : {}
                                                            return (
                                                                <Upload
                                                                    className="cursor-pointer"
                                                                    onChange={(
                                                                        files
                                                                    ) =>
                                                                        onSetFormFile(
                                                                            form,
                                                                            field,
                                                                            files
                                                                        )
                                                                    }
                                                                    onFileRemove={(
                                                                        files
                                                                    ) =>
                                                                        onSetFormFile(
                                                                            form,
                                                                            field,
                                                                            files
                                                                        )
                                                                    }
                                                                    showList={
                                                                        false
                                                                    }
                                                                    uploadLimit={
                                                                        1
                                                                    }
                                                                />
                                                            )
                                                        }}
                                                    </Field>

                                                    <div className="mt-4 ltr:text-right">
                                                        <Button
                                                            variant="solid"
                                                            loading={
                                                                isSubmitting
                                                            }
                                                            type="submit"
                                                            disabled={
                                                                attchmentURL ===
                                                                ''
                                                            }
                                                        >
                                                            {isSubmitting
                                                                ? 'Uploading'
                                                                : 'Upload'}
                                                        </Button>
                                                    </div>
                                                </FormContainer>
                                            </Form>
                                        )
                                    }}
                                </Formik>
                            </div>
                        </Dialog>{' '}
                    </div>
                </>
            )}
        </>
    )
}

export default TicketContent
