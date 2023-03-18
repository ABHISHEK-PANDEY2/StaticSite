import React, { useState } from 'react'
import classNames from 'classnames'
import { Card, Calendar, Badge, Avatar, Progress, Tag } from 'components/ui'
import useThemeClass from 'utils/hooks/useThemeClass'
import { HiVideoCamera, HiDocumentText, HiChatAlt2 } from 'react-icons/hi'

//http://preview.themeforest.net/item/elstar-react-tailwind-admin-template/full_screen_preview/39768117?_ga=2.264821324.239961410.1676554479-269397276.1655479848&_gac=1.181967701.1673943882.Cj0KCQiAq5meBhCyARIsAJrtdr4cYGOZVmfXMHO6gMqkWn8G461NzxzLFoOEOyY_Gey6JHMGz6y4V8gaAoxYEALw_wcB
// for calender ref Custom render

const isToday = (someDate) => {
    const today = new Date()
    return (
        someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
    )
}

const EventIcon = ({ type }) => {
    const baseClass =
        'rounded-lg h-10 w-10 text-lg flex items-center justify-center'

    switch (type) {
        case 'meeting':
            return (
                <div
                    className={classNames(
                        baseClass,
                        'text-indigo-600 bg-indigo-100 dark:text-indigo-100 dark:bg-indigo-500/20'
                    )}
                >
                    <HiVideoCamera />
                </div>
            )
        case 'task':
            return (
                <div
                    className={classNames(
                        baseClass,
                        'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100'
                    )}
                >
                    <HiDocumentText />
                </div>
            )
        case 'workshop':
            return (
                <div
                    className={classNames(
                        baseClass,
                        'text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20'
                    )}
                >
                    <HiChatAlt2 />
                </div>
            )
        default:
            return null
    }
}

const Schedule = ({ data = [] }) => {
    const [value, setValue] = useState()

    const { textTheme } = useThemeClass()

    const CardHeader = () => {
        return <p>Hello</p>
    }

    return (
        <Card
            header={
                <div className="px-3 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <Avatar
                            shape="circle"
                            src="/img/avatars/thumb-10.jpg"
                        />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                Rohan P.
                            </div>
                            <div className="text-xs">ReactJS Developer</div>
                        </div>
                    </div>
                    <div>
                        <Progress variant="circle" percent="75" width={50} />
                    </div>
                </div>
            }
            className="mb-4"
        >
            <h6>Standup history</h6>
            <div className="py-5 mx-auto max-w-[420px]">
                <Calendar
                    value={value}
                    onChange={setValue}
                    dayClassName={(date, { selected }) => {
                        const defaultClass = 'text-base'

                        if (isToday(date) && !selected) {
                            return classNames(defaultClass, textTheme)
                        }

                        if (selected) {
                            return classNames(defaultClass, 'text-white')
                        }

                        return defaultClass
                    }}
                    dayStyle={() => {
                        return { height: 48 }
                    }}
                    renderDay={(date) => {
                        const day = date.getDate()

                        if (!isToday(date)) {
                            return <span>{day}</span>
                        }

                        return (
                            <span className="relative flex justify-center items-center w-full h-full">
                                {day}
                                <Badge
                                    className="absolute bottom-1"
                                    innerClass="h-1 w-1"
                                />
                            </span>
                        )
                    }}
                />
            </div>
            <hr className="my-6" />
            <div className="px-3 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div>
                        <Tag className="bg-emerald-500 text-white dark:bg-emerald-500/20 dark:text-emerald-100 border-0 ">
                            {' '}
                            Submitted
                        </Tag>
                    </div>
                    <div>
                        <Tag className="text-white bg-red-500 dark:text-red-100 dark:bg-red-500/20 border-0">
                            Missed
                        </Tag>
                    </div>
                    <div>
                        {' '}
                        <Tag className="text-white bg-gray-500 dark:text-red-100 dark:bg-red-500/20 border-0">
                            {' '}
                            Weekend/optional
                        </Tag>
                    </div>
                </div>
            </div>
            <p className="px-3">
                All dates and times are dispalyed in the U.S. Pacific timezone.
            </p>
        </Card>
    )
}

export default Schedule
