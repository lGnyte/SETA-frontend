// import logo from '../../../public/img/logo.svg'
// import { FaFolderOpen } from 'react-icons/fa'
// import { PiExamFill } from 'react-icons/pi'
// import { IoCreateSharp, IoHome } from 'react-icons/io5'
import { useAuth } from "../../lib/auth-context"
// import { MdCreateNewFolder, MdLogin, MdLogout } from "react-icons/md"
// import { LuUserPlus } from "react-icons/lu"
// import { TbCategoryFilled } from "react-icons/tb"
import { IoMdClose } from "react-icons/io"
import {Link} from "react-router-dom";
import {IoHome} from "react-icons/io5";
import {MdLogin, MdLogout} from "react-icons/md";
import {LuUserPlus} from "react-icons/lu";

export default function TheSidebar(props: { show: boolean, close: () => void}) {
    const { show, close } = props
    const { token, logout } = useAuth()

    document.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', close)
    })

    return (
        <div className={`lg:w-[300px] md:w-[250px] w-[calc(100vw-16px)] m-2 md:my-4 md:ml-4 md:mr-0 md:rounded-r-none rounded-2xl md:static p-3 lg:p-5 border-2 border-gray-200 shadow-xl bg-white flex-col ${show ? "flex absolute" : "md:flex hidden absolute"}`}>
            <button className="self-end md:hidden" onClick={close}>
                <IoMdClose size={40} className="text-primary" />
            </button>
            <div className="flex flex-wrap justify-center md:mt-8">
                {/*<img src={logo} alt="logo" className="w-20 h-20 mb-2" />*/}
                <p className="w-full text-2xl font-bold text-center">Exam Manager</p>
            </div>
            <hr className="mt-10 mb-1 border-gray-300" />
            <div className="flex pb-10 h-full flex-col [&>a]:flex [&>a]:select-none [&>a]:items-center [&>a]:gap-4 [&>a]:px-4 lg:[&>a]:px-8 [&>a]:font-bold [&>a:hover]:text-white [&>a:hover]:bg-primary [&>a]:duration-200 [&>a]:py-2 [&>a]:mx-2 [&>a]:rounded-md text-lg">
                <Link to={"/"}>
                    <IoHome size={20} />
                    Home
                </Link>
                <hr className="my-1 border-gray-300" />
                {/*<Link to={token ? "/exercises" : "/login"} className={!token ? "cursor-not-allowed" : ""}>*/}
                {/*    <FaFolderOpen size={20} />*/}
                {/*    All Exercises*/}
                {/*</Link>*/}
                {/*<Link to={token ? "/exercises/new" : "/login"} className={!token ? "cursor-not-allowed" : ""}>*/}
                {/*    <MdCreateNewFolder  size={20} />*/}
                {/*    New Exercise*/}
                {/*</Link>*/}
                {/*<Link to={token ? "/exercises/categories" : "/login"} className={!token ? "cursor-not-allowed" : ""}>*/}
                {/*    <TbCategoryFilled  size={20} />*/}
                {/*    Categories*/}
                {/*</Link>*/}
                {/*<hr className="my-1" />*/}
                {/*<Link to={token ? "/exams" : "/login"} className={!token ? "cursor-not-allowed" : ""}>*/}
                {/*    <PiExamFill size={20} />*/}
                {/*    Exams*/}
                {/*</Link>*/}
                {/*<Link to={token ? "/exams/new" : "/login"} className={!token ? "cursor-not-allowed" : ""}>*/}
                {/*    <IoCreateSharp size={20} />*/}
                {/*    Create Exam*/}
                {/*</Link>*/}
                <hr className="mt-auto mb-1 border-gray-200" />
                {token ?
                    <a href="#" onClick={logout}>
                        <MdLogout size={20} />
                        Logout
                    </a>
                    :
                    <>
                        <Link to={"/login"}>
                            <MdLogin size={20} />
                            Login
                        </Link>
                        <Link to={"/register"}>
                            <LuUserPlus size={20} />
                            Register
                        </Link>
                    </>
                }
            
            </div>
            <div>
                <p className="text-sm text-center text-gray-700">
                    &copy;2024 Exam Manager
                </p>
            </div>
        </div>
    )
}