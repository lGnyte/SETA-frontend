import { Link, Outlet, useLocation } from "react-router-dom";
import logo from '../../../public/vite.svg'
import { getRouteConfig } from "../../lib/routes";

export default function CenteredLayout() {
    const location = useLocation();
    const { title } = getRouteConfig(location.pathname);
    document.title = title;

    return(
        <main className="h-[100vh] flex flex-col w-full items-center">
            <header className="bg-white w-full flex justify-center items-center h-16 shadow-md">
                <img src={logo} alt="logo" className="w-12 h-12" />
                <Link to={"/"} className="ml-4 text-2xl xs:text-4xl font-bold">
                    Exam Manager
                </Link>
            </header>
            <Outlet />
        </main>
    )
}