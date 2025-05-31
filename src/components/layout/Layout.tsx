import { Outlet, useLocation } from "react-router-dom";
import TheHeader from './TheHeader';
import TheSidebar from './TheSidebar';
import { getRouteConfig } from "../../lib/routes";
import { useState } from "react";

export default function Layout() {
    const location = useLocation();
    const [showSidebar, setShowSidebar] = useState(false);
    const { title, icon } = getRouteConfig(location.pathname);
    document.title = title;

    return (
        <>
            <TheSidebar show={showSidebar} close={() => setShowSidebar(false)} />
            <div className="flex-1 flex flex-col h-[100vh] p-2 md:p-4 md:pl-0">
                <TheHeader title={title} Icon={icon} toggleSidebar={() => setShowSidebar(!showSidebar)} />
                <main className="overflow-y-auto px-2 xs:px-5 md:px-6 xl:px-10 py-4 xs:py-4 md:py-8 flex-1 border-b-2 rounded-b-xl md:rounded-bl-none bg-[#f5f5f5] shadow-md">
                    <Outlet />
                </main>
            </div>
        </>
    )
}