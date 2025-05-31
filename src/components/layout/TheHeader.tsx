import { Link } from "react-router-dom";
import type {IconType} from "react-icons";
import { FaUserCircle } from "react-icons/fa";
import { TbMenu2 } from "react-icons/tb";
import {IoMdLogOut} from "react-icons/io";
import {useAuth} from "../../lib/auth-context.tsx";

interface TheHeaderProps {
    title: string;
    Icon: IconType;
    toggleSidebar: () => void;
}

export default function TheHeader(props: TheHeaderProps) {
    const { title, Icon, toggleSidebar } = props;
    const { token, logout, username } = useAuth();
    return(
        <header className="flex items-center h-16 px-3 sm:px-6 bg-white shadow-md border-y-2 border-gray-200 rounded-t-xl md:rounded-tl-none">
            <button onClick={toggleSidebar} className="block md:hidden">
                <TbMenu2 size={36} className="text-primary mr-5" />
            </button>
            <Icon size={42} className="p-2 mr-4 border rounded-lg bg-primary text-primary bg-opacity-40 border-primary" />
            <h1 className="mr-auto text-3xl font-bold">
                {title}
            </h1>
            <nav className="text-lg font-semibold flex items-center gap-2 [&>a]:px-4 [&>a]:py-1 [&>a:hover]:bg-primary [&>a:hover]:text-white [&>a]:rounded-md [&>a]:duration-200 ">
                <div className="sm:flex hidden items-center gap-2 px-2 py-1 duration-200 rounded-md select-none">
                    <FaUserCircle size={24} />
                    <span className="flex">
                        {username || "Guest"}
                    </span>
                </div>
                {token ?
                    <div onClick={logout} title="Logout" className="flex items-center w-8 gap-2 overflow-hidden duration-200 cursor-pointer hover:bg-primary hover:px-2 hover:py-1 rounded-md hover:text-white [&>span]:w-0 hover:[&>span]:w-auto hover:w-28">
                        <IoMdLogOut size={24} />
                        <span>Logout</span>
                    </div>
                    :
                    <Link to={"/login"} className="hidden xs:inline-block">Login</Link>
                }
            </nav>
        </header>
    )
}