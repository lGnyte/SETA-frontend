import { useAuth } from "../../lib/auth-context"
import { IoMdClose } from "react-icons/io"
import {Link} from "react-router-dom";
import {IoBookOutline} from "react-icons/io5";
import {MdLogin, MdLogout} from "react-icons/md";
import {LuBookPlus, LuUserPlus} from "react-icons/lu";
import {PiHouseFill} from "react-icons/pi";

export default function TheSidebar(props: { show: boolean, close: () => void}) {
    const { show, close } = props
    const { token, logout, userId } = useAuth()

    document.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', close)
    })

    return (
        <div className={`lg:w-[300px] md:w-[250px] w-[calc(100vw-16px)] md:mr-0 md:static p-3 lg:p-5 border-2 border-gray-200 bg-white flex-col ${show ? "flex absolute" : "md:flex hidden absolute"}`}>
            <button className="self-end md:hidden" onClick={close}>
                <IoMdClose size={40} />
            </button>
            <div className="flex flex-wrap justify-center md:mt-8">
                {/*<img src={logo} alt="logo" className="w-20 h-20 mb-2" />*/}
                <p className="w-full text-2xl font-bold text-center">NARRATIVA</p>
            </div>
            <div className="flex mt-12 pb-10 h-full flex-col [&>a]:flex [&>a]:select-none [&>a]:items-center [&>a]:gap-4 [&>a]:px-4 lg:[&>a]:px-8 [&>a:hover]:bg-gray-100 [&>a]:duration-200 [&>a]:py-1 [&>a]:mx-2 [&>a]:rounded-md text-lg">
                <Link to={"/"}>
                    <PiHouseFill size={20} />
                    Home
                </Link>
                <Link to={token ? `/book/user/${userId}` : "/login"} className={!token ? "cursor-not-allowed" : ""}>
                    <IoBookOutline size={20} />
                    My Books
                </Link>
                <Link to={token ? `/book/create` : "/login"} className={!token ? "cursor-not-allowed" : ""}>
                    <LuBookPlus size={20} />
                    Create a book
                </Link>
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
                    &copy;2025 Narrativa
                </p>
            </div>
        </div>
    )
}