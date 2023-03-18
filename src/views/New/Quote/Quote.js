import { Card, Button } from 'components/ui'
import React from 'react'
import { Link } from 'react-router-dom'

const Quote = () => {
    return (
        <div>
            <center style={{ marginTop: '30px', whiteSpace: 'nowrap' }}>
                <h3 className="mb-2 text-center">
                    <span>🚀 Let's Create Website with </span>
                    <span style={{ color: '#006D77' }}>Website Builder</span>
                </h3>
            </center>
            <div className="grid gap-4 container p-8">
                <Card>
                    <div className="flex items-center justify-between rounded-md mb-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-600/40 cursor-pointer user-select">
                        <div className="flex items-center gap-5">
                            <h1>1</h1>
                            <div>
                                <h6 className="text-sm font-bold">
                                    Write your Website requirement.
                                </h6>
                                <p>
                                    We will Provide you best website creation
                                    using AI
                                </p>
                            </div>
                        </div>
                        <Link to='/performance'>
                            <Button
                                style={{
                                    backgroundColor: '#006D77',
                                    color: 'white',
                                }}
                            >
                                Create Website
                            </Button>
                        </Link>
                    </div>
                </Card>
                {/* <div className="flex items-center justify-between  ">
                    {' '}
                    <hr width="40%" />
                    <strong>Or</strong>
                    <hr width="40%" />
                </div>

                <Card>
                    <div className="flex items-center justify-between rounded-md mb-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-600/40 cursor-pointer user-select">
                        <div className="flex items-center gap-5">
                            <h1>2</h1>
                            <div>
                                <h6 className=" text-sm font-bold">
                                    Hire developers and designers on monthly
                                    subscription.
                                </h6>
                                <p>
                                    Get Developer Pass and Designer Pass and
                                    work on unlimited project without worrying
                                    about cost.
                                </p>
                            </div>
                        </div>
                        <Button
                            style={{
                                backgroundColor: '#006D77',
                                color: 'white',
                            }}
                        >
                            Subscribe Now
                        </Button>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center justify-between rounded-md mb-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-600/40 cursor-pointer user-select">
                        <div className="flex items-center gap-5">
                            <h1>3</h1>
                            <div>
                                <h6 className="text-sm font-bold">
                                    Invite your co-founder & built your HQ.
                                </h6>
                                <p>
                                    Add your co-founders, project managers etc.
                                    who can review the work.
                                </p>
                            </div>
                        </div>
                        <Button
                            style={{
                                backgroundColor: '#006D77',
                                color: 'white',
                            }}
                        >
                            Send Invite
                        </Button>
                    </div>
                </Card> */}
            </div>
        </div>
    )
}

export default Quote
