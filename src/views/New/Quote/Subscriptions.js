import { Card, Button } from 'components/ui'
import React from 'react'
import { useState } from 'react'
import {
    HiOutlineMinus,
    HiOutlinePlus,
    HiOutlineCheckCircle,
} from 'react-icons/hi'

const Subscriptions = () => {
    const [DesignersCounter, setDesignersCounter] = useState(0)
    return (
        <div>
            <h3>Subscribe & Build Team</h3>
            <p>
                Don't have big budget to hire agencies? Hire developers &
                designers on monthly subscription called DeveloperPass.
            </p>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-4 py-4">
                <Card>
                    <h4>Designers</h4>
                    <p>
                        Ideal for individuals who need quick access to basic
                        work.
                    </p>
                    <div className="mb-2 py-4">
                        <span style={{ color: '#006D77' }} className="h3">
                            $ 800{' '}
                        </span>
                        <span>/month</span>
                    </div>
                    <h6>Add designers</h6>
                    <Card>
                        <div className="flex justify-between">
                            <button
                                onClick={() =>
                                    setDesignersCounter(DesignersCounter - 1)
                                }
                            >
                                <HiOutlineMinus />
                            </button>
                            {DesignersCounter}
                            <button
                                onClick={() =>
                                    setDesignersCounter(DesignersCounter + 1)
                                }
                            >
                                <HiOutlinePlus />
                            </button>
                        </div>
                    </Card>
                    <div className="py-4 px-4">
                        <div className="py-2  flex items-center gap-2">
                            <HiOutlineCheckCircle />
                            <div>
                                <div className="text-sm font-bold">
                                    Access to 100+ top talents profile
                                </div>
                            </div>
                        </div>
                        <div className="py-2 flex items-center gap-2">
                            <HiOutlineCheckCircle />
                            <div>
                                <div className="text-sm font-bold ">
                                    Custom jobs and project templates
                                </div>
                            </div>
                        </div>
                        <div className="py-2 flex items-center gap-2">
                            <HiOutlineCheckCircle />
                            <div>
                                <div className="text-sm font-bold">
                                    Unlimited Project Hours
                                </div>
                            </div>
                        </div>
                        <div className="py-2 flex items-center gap-2">
                            <HiOutlineCheckCircle />
                            <div>
                                <div className="text-sm font-bold">
                                    24/7 Tech support
                                </div>
                            </div>
                        </div>
                        <div className="py-2 flex items-center gap-2">
                            <HiOutlineCheckCircle />
                            <div>
                                <div className="text-sm font-bold">
                                    Unlimited projects
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card>
                    <h4>Developers</h4>
                    <p>
                        Ideal for individuals who need quick access to basic
                        work.
                    </p>
                    <div className="mb-2 py-4">
                        <span style={{ color: '#006D77' }} className="h3">
                            $ 2000{' '}
                        </span>
                        <span>/month</span>
                    </div>
                    <h6>Add developers</h6>
                    <Card>
                        <div className="flex justify-between">
                            <button
                                onClick={() =>
                                    setDesignersCounter(DesignersCounter - 1)
                                }
                            >
                                <HiOutlineMinus />
                            </button>
                            {DesignersCounter}
                            <button
                                onClick={() =>
                                    setDesignersCounter(DesignersCounter + 1)
                                }
                            >
                                <HiOutlinePlus />
                            </button>
                        </div>
                    </Card>
                    <div className="py-4 px-4">
                        <div className="py-2  flex items-center gap-2">
                            <HiOutlineCheckCircle />
                            <div>
                                <div className="text-sm font-bold">
                                    Access to 100+ top talents profile
                                </div>
                            </div>
                        </div>
                        <div className="py-2 flex items-center gap-2">
                            <HiOutlineCheckCircle />
                            <div>
                                <div className="text-sm font-bold ">
                                    Custom jobs and project templates
                                </div>
                            </div>
                        </div>
                        <div className="py-2 flex items-center gap-2">
                            <HiOutlineCheckCircle />
                            <div>
                                <div className="text-sm font-bold">
                                    Unlimited Project Hours
                                </div>
                            </div>
                        </div>
                        <div className="py-2 flex items-center gap-2">
                            <HiOutlineCheckCircle />
                            <div>
                                <div className="text-sm font-bold">
                                    24/7 Tech support
                                </div>
                            </div>
                        </div>
                        <div className="py-2 flex items-center gap-2">
                            <HiOutlineCheckCircle />
                            <div>
                                <div className="text-sm font-bold">
                                    Unlimited projects
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="text-right mt-6">
                <Button
                    className="ltr:mr-2 rtl:ml-2"
                    border
                    //onClick={onDialogClose}
                >
                    Skip & I just want agency
                </Button>
                <Button variant="solid">
                    {' '}
                    {/*onClick={onDialogOk}*/}
                    Subscribe
                </Button>
            </div>
        </div>
    )
}

export default Subscriptions
