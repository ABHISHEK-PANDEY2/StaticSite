import { Button, Card, Avatar, Input } from 'components/ui'
import React from 'react'
import {
    HiOutlineHand,
    HiOutlineClock,
    HiOutlineUser,
    HiOutlineUsers,
    HiOutlineSparkles,
    HiOutlineFlag,
    HiOutlineExternalLink,
    HiChevronDown,
} from 'react-icons/hi'

const Projectdashboard = () => {
    return (
        <div>
            <h3>Project Name</h3>
            <div className="" style={{ marginTop: '10px' }}>
                <Button>Send a Project Invite</Button>&nbsp;&nbsp;&nbsp;
                <Button
                    style={{
                        backgroundColor: '#006D77',
                        color: 'white',
                        marginTop: '15px',
                    }}
                >
                    Add a Team Member
                </Button>
            </div>
            <div
                className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4"
                style={{ marginTop: '30px' }}
            >
                <Card
                    header={
                        <div className="py-2 px-3 flex items-center gap-2">
                            <Avatar
                                shape="circle"
                                src="/img/avatars/thumb-10.jpg"
                            />
                            <div>
                                <div className="font-bold text-gray-900 dark:text-gray-100">
                                    Rohan P.
                                </div>
                                <div className="text-xs">
                                    Developer @Bright minds Inc.
                                </div>
                            </div>
                        </div>
                    }
                >
                    <div className="px-3 ">
                        <p style={{ color: '#4CC96F' }}>&#x2022; Working on</p>
                        <p>Developing sign up flow</p>
                        <div className="py-3 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <HiOutlineClock />
                                <div>
                                    <h6 className=" text-sm font-bold">
                                        Worked today
                                    </h6>
                                </div>
                            </div>

                            <p className="flex justify-end">56 Min</p>
                        </div>
                        <p className="px-4">Work hours</p>
                        <p className="px-4 py-1">3PM - 11PM</p>
                    </div>
                    <hr></hr>
                    <div className="px-3 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <p width="15px">
                                <HiOutlineHand />{' '}
                            </p>
                            <div>
                                <h6 className=" text-sm font-bold">Blocked</h6>
                            </div>
                        </div>
                        <p>0</p>
                    </div>
                    <hr></hr>
                    <div className="px-3 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <HiOutlineUser />
                            <div>
                                <h6 className=" text-sm font-bold">
                                    Next standup
                                </h6>
                            </div>
                        </div>
                        <p>In 2 hrs</p>
                    </div>
                    <hr></hr>
                    <div className="px-3 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <HiOutlineUsers />
                            <div>
                                <h6 className=" text-sm font-bold">
                                    Ask for 1 on 1s
                                </h6>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            className="rounded"
                            style={{
                                backgroundColor: '#006D77',
                                color: 'white',
                                padding: '5px',
                            }}
                        >
                            Send Invite
                        </Button>
                    </div>
                    <hr></hr>
                    <div className="px-3 py-3 ">
                        <div className="flex items-center gap-1">
                            <HiOutlineSparkles />
                            <h6 className=" text-sm font-bold">
                                How is he performing today?
                            </h6>
                        </div>
                        <div className="py-3 px-3">
                            <Input
                                textArea
                                placeholder="Write short review/feedback?"
                            ></Input>
                        </div>
                        <div className="py-3 flex justify-end">
                            <Button
                                size="sm"
                                className="rounded"
                                style={{
                                    backgroundColor: '#006D77',
                                    color: 'white',
                                    padding: '5px',
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="px-3 py-3 flex items-center justify-between ">
                        <div className="flex items-center gap-5">
                            <HiOutlineFlag />
                            <div>
                                <h6 className="text-sm font-bold">
                                    Trial period success
                                </h6>
                                <p>08 days remaining</p>
                            </div>
                        </div>
                        <a href="#demo" data-toggle="collapse">
                            {' '}
                            <HiChevronDown />
                        </a>
                    </div>
                    <hr></hr>
                    <div className="px-3 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <div>
                                <h6 className=" text-sm font-bold">
                                    Have you completed onboarding?
                                </h6>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            id="checkbox1"
                            name="checkbox1"
                            value="checkbox1"
                        />
                    </div>
                    <p className="px-3 ">
                        Mark this option once you have completed all the items
                        in the onboarding documents checklist.
                    </p>
                    <a
                        className="px-3 py-3 flex items-center"
                        style={{ color: '#1879C9' }}
                    >
                        <HiOutlineExternalLink />
                        &nbsp;Onboarding documents
                    </a>
                    <div className="px-3 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <div>
                                <h6 className=" text-sm font-bold">
                                    Trial periods goals
                                </h6>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            id="checkbox2"
                            name="checkbox2"
                            value="checkbox2"
                        />
                    </div>
                    <div className="px-3">
                        <ul>
                            <p>&#x2022; Reliable, cleanly written code</p>
                            <p>&#x2022; Proactiveness</p>
                            <p>
                                &#x2022; Quality of code going in without
                                significant changes
                            </p>
                            <p>&#x2022; Quality of communication</p>
                            <p>&#x2022; Ability to hit project</p>
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Projectdashboard
