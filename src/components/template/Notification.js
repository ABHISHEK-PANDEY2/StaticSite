import React, { useEffect, useState, useCallback } from 'react'
import classNames from 'classnames'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import {
    Avatar,
    Dropdown,
    ScrollBar,
    Spinner,
    Badge,
    Button,
    Dialog,
    Notification,
    toast,
} from 'components/ui'
import {
    HiOutlineBell,
    HiOutlineCalendar,
    HiOutlineClipboardCheck,
    HiOutlineBan,
    HiOutlineMailOpen,
} from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import isLastChild from 'utils/isLastChild'
import useTwColorByName from 'utils/hooks/useTwColorByName'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useSelector } from 'react-redux'
import useResponsive from 'utils/hooks/useResponsive'
import acronym from 'utils/acronym'
import {
    getAllNotificationbyUserID,
    updateInviteStatus,
} from 'configs/firebase.config'
import dayjs from 'dayjs'

const notificationHeight = 'h-72'
const imagePath = '/img/avatars/'

const GeneratedAvatar = ({ target }) => {
    const color = useTwColorByName()
    return (
        <Avatar shape="circle" className={`${color(target)}`}>
            {acronym(target)}
        </Avatar>
    )
}

const notificationTypeAvatar = (data) => {
    const { type, target, image, status } = data
    switch (type) {
        case 0:
            if (image) {
                return <Avatar shape="circle" src={`${imagePath}${image}`} />
            } else {
                return <GeneratedAvatar target={target} />
            }
        case 1:
            return (
                <Avatar
                    shape="circle"
                    className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100"
                    icon={<HiOutlineCalendar />}
                />
            )
        case 2:
            const statusSucceed = status === 'succeed'
            const statusColor = statusSucceed
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100'
                : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100'
            const statusIcon = statusSucceed ? (
                <HiOutlineClipboardCheck />
            ) : (
                <HiOutlineBan />
            )
            return (
                <Avatar
                    shape="circle"
                    className={statusColor}
                    icon={statusIcon}
                />
            )
        default:
            return <Avatar />
    }
}

const NotificationToggle = ({ className, dot }) => {
    return (
        <div className={classNames('text-2xl', className)}>
            {dot ? (
                <Badge badgeStyle={{ top: '3px', right: '6px' }}>
                    <HiOutlineBell />
                </Badge>
            ) : (
                <HiOutlineBell />
            )}
        </div>
    )
}

export const Notifications = ({ className }) => {
    const [notificationList, setNotificationList] = useState([])
    const [teamDetails, setTeamDetails] = useState()
    const [notificationtext, setNotificationtext] = useState()
    const [InviteAcpted, setInviteAcpted] = useState()
    const [unreadNotification, setUnreadNotification] = useState(false)
    const [noResult, setNoResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dialogIsOpen, setIsOpen] = useState(false)

    const { bgTheme } = useThemeClass()

    const { larger } = useResponsive()

    const navigate = useNavigate();

    const direction = useSelector((state) => state.theme.direction)

    const acceptInvite = async () => {
        let result = await updateInviteStatus(teamDetails)
        if (result === 'success') {
            navigate('/home')
            toast.push(
                <Notification type="success">
                    Now You are the Part of {teamDetails.team_details.team_name} Team{' '}
                </Notification>
            )
        }
        setIsOpen(false)
    }

    const getNotificationCount = useCallback(async () => {
        let resp = await getAllNotificationbyUserID()
        if (resp.length > 0) {
            setNoResult(false)
            setUnreadNotification(true)
        } else {
            setNoResult(true)
        }
    }, [setUnreadNotification])

    useEffect(() => {
        getNotificationCount()
    }, [getNotificationCount])

    const onNotificationOpen = useCallback(async () => {
        if (notificationList.length === 0) {
            setLoading(true)
            let resp = await getAllNotificationbyUserID()
            setLoading(false)
            setNotificationList(resp)
        }
    }, [notificationList, setLoading])

    const onMarkAsRead = useCallback(
        (id) => {
            const list = notificationList.map((item) => {
                if (item.id === id) {
                    item.readed = true
                }
                return item
            })
            setNotificationList(list)
            const hasUnread = notificationList.some((item) => !item.readed)

            if (!hasUnread) {
                setUnreadNotification(false)
            }
        },
        [notificationList]
    )

    return (
        <Dropdown
            renderTitle={
                <NotificationToggle
                    dot={unreadNotification}
                    className={className}
                />
            }
            menuClass="p-0 min-w-[280px] md:min-w-[340px]"
            placement={larger.md ? 'bottom-end' : 'bottom-center'}
            onOpen={onNotificationOpen}
        >
            <Dropdown.Item variant="header">
                <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
                    <h6>Notifications</h6>
                </div>
            </Dropdown.Item>
            <div className={classNames('overflow-y-auto', notificationHeight)}>
                <ScrollBar direction={direction}>
                    {notificationList.length > 0 &&
                        notificationList.sort((a, b) => b.updated_on - a.updated_on).map((item, index) => (
                            <div
                                key={item.id}
                                className={`relative flex px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-20  ${
                                    !isLastChild(notificationList, index)
                                        ? 'border-b border-gray-200 dark:border-gray-600'
                                        : ''
                                }`}
                                onClick={() => {
                                    if (item.notification_type === 'invite') {
                                        setTeamDetails(item)
                                        setInviteAcpted(item.acceptence_status)
                                        setNotificationtext(
                                            item.notification_message
                                        )
                                    }
                                }}
                            >
                                <div className="ltr:ml-3 rtl:mr-3">
                                    <div onClick={() => {
                                        if (item.notification_type === 'invite') {
                                        setIsOpen(true)
                                    }}}>
                                        <span className="text-m">
                                            {item.notification_message}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-xs ">
                                            {dayjs(
                                                item.invited_on.toDate()
                                            ).format('DD/MM/YYYY')}
                                        </span>{' '}
                                        &nbsp;&nbsp;&nbsp;
                                        <span className="text-xs">
                                            {dayjs(
                                                item.invited_on.toDate()
                                            ).format('HH:MM')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    {loading && (
                        <div
                            className={classNames(
                                'flex items-center justify-center',
                                notificationHeight
                            )}
                        >
                            <Spinner size={40} />
                        </div>
                    )}
                    {noResult && (
                        <div
                            className={classNames(
                                'flex items-center justify-center',
                                notificationHeight
                            )}
                        >
                            <div className="text-center">
                                <img
                                    className="mx-auto mb-2 max-w-[150px]"
                                    src="/img/others/no-notification.png"
                                    alt="no-notification"
                                />
                                <h6 className="font-semibold">
                                    No notifications!
                                </h6>
                                <p className="mt-1">Please Try again later</p>
                            </div>
                        </div>
                    )}
                </ScrollBar>
                <Dialog
                    isOpen={dialogIsOpen}
                    onClose={() => setIsOpen(false)}
                    onRequestClose={() => setIsOpen(false)}
                >
                    <h5 className="mb-4">Accept Invite</h5>
                    <p>{notificationtext}</p>
                    <div className="text-right mt-6">
                        {InviteAcpted === 'pending' ? (
                            <Button variant="solid" onClick={acceptInvite}>
                                Accept Invite
                            </Button>
                        ) : (
                            <Button variant="solid" disabled>
                                Accepted
                            </Button>
                        )}
                    </div>
                </Dialog>
            </div>
        </Dropdown>
    )
}

export default withHeaderItem(Notifications)
