import React from 'react'
import {
    HiOutlineHome,
    HiViewGridAdd,
    HiOutlineBriefcase,
    HiOutlineClipboardCheck,
    HiOutlineUsers,
    HiOutlineUser,
    HiOutlineDocumentReport,
    HiOutlineLibrary,
    HiUsers,
    HiOutlineUserCircle
} from 'react-icons/hi'

const navigationIcon = {
    overview: <HiViewGridAdd />,
    projectdashboard: <HiOutlineBriefcase />,
    hired: <HiViewGridAdd />,
    tasks: <HiOutlineClipboardCheck />,
    developement: <HiOutlineHome />,
    design: <HiOutlineHome />,
    standups: <HiOutlineUsers />,
    oneon1: <HiOutlineUser />,
    performance: <HiOutlineDocumentReport />,
    timesheets: <HiOutlineHome />,
    headquarters: <HiOutlineLibrary />,
    teams:<HiUsers/>,
    settings:<HiOutlineUserCircle/>
}

export default navigationIcon
