import { IoHome } from "react-icons/io5"
import { LuCalendarClock } from "react-icons/lu"
import { FaUser } from "react-icons/fa"
import { IoSettings } from "react-icons/io5"

export const menubar = [
    {
        icon : <IoHome />,
        path : '/meetingLink'
    },
    {
        icon : <LuCalendarClock />,
        path : 'schedule'
    },
    {
        icon : <FaUser />,
        path : 'user'
    },
    {
        icon : <IoSettings />,
        path : 'setting'
    }
]