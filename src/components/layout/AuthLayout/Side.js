import React, { cloneElement } from 'react'
import { Avatar } from 'components/ui'
import Logo from 'components/template/Logo'
import sideFrame from '../../../assets/images/sideFrame.png'
import LOGO_SRC_PATH_WHITE from '../../../assets/images/logo/logowhite.png'

const Side = ({ children, content, ...rest }) => {
    return (
        <div className="grid lg:grid-cols-3 h-full">
            <div
                className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
                style={{
                    backgroundImage: `url(${sideFrame})`,
                }}
            >
                <Logo mode="dark" path={LOGO_SRC_PATH_WHITE}/>
                <div>
                    <div className="mb-6 flex items-center gap-4">
                        <Avatar
                            className="border-2 border-white"
                            shape="circle"
                            src="/img/avatars/thumb-10.jpg"
                        />
                        <div className="text-white">
                            <div className="font-semibold text-base">
                                Brittany Jones
                            </div>
                            <span className="opacity-80">CTO, Leon Inc.</span>
                        </div>
                    </div>
                    <p className="text-lg text-white opacity-80">
                        Developer Pass is an excellent platform for hiring top
                        freelance talent at affordable prices. The process is
                        easy and the end result is high-quality work. Highly
                        recommended!
                    </p>
                </div>
                <span className="text-white">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                </span>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-8">
                    <div className="mb-8">{content}</div>
                    {children ? cloneElement(children, { ...rest }) : null}
                </div>
            </div>
        </div>
    )
}

export default Side
