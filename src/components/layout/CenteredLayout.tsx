import { Outlet, useLocation } from "react-router-dom";
import { getRouteConfig } from "../../lib/routes";

export default function CenteredLayout() {
  const location = useLocation();
  const { title } = getRouteConfig(location.pathname);
  document.title = title;

  return (
    <main className="h-[100vh] flex flex-col w-full items-center">
      <Outlet />
    </main>
  );
}
