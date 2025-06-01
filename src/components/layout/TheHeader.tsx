import { Link } from "react-router-dom";
import type {IconType} from "react-icons";
import { FaUserCircle } from "react-icons/fa";
import { TbMenu2 } from "react-icons/tb";
import {IoMdLogOut} from "react-icons/io";
import {useAuth} from "../../lib/auth-context.tsx";
import {RiCoinsFill} from "react-icons/ri";

interface TheHeaderProps {
    title: string;
    Icon: IconType;
    toggleSidebar: () => void;
}

export default function TheHeader(props: TheHeaderProps) {
    const { toggleSidebar } = props;
    const { token, logout, username, balance } = useAuth();
    console.log(balance)
    return(
        <header className="flex items-center h-16 px-3 sm:px-6 bg-white shadow-md border-gray-200">
            <button onClick={toggleSidebar} className="block md:hidden">
                <TbMenu2 size={36} className="mr-5" />
            </button>
            <nav className="text-lg font-semibold ml-auto flex items-center gap-2 [&>a]:px-4 [&>a]:py-1 [&>a:hover]:bg-gray-100  [&>a]:rounded-md [&>a]:duration-200 ">
                <div className="sm:flex hidden items-center gap-2 px-2 py-1 duration-200 rounded-md select-none">
                    {username &&
                        <div className="flex items-center gap-2 mr-5 text-yellow-500">
                            <RiCoinsFill size={24} />
                            {balance}
                        </div>
                    }
                    <FaUserCircle size={24} />
                    <span className="flex">
                        {username || "Guest"}
                    </span>
                </div>
                {token ?
                    <div onClick={logout} title="Logout" className="flex items-center w-8 gap-2 overflow-hidden duration-200 cursor-pointer hover:bg-gray-100 hover:px-2 hover:py-1 rounded-md [&>span]:w-0 hover:[&>span]:w-auto hover:w-28 text-md">
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