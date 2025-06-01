import type { IconType } from 'react-icons';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';

interface RouteConfig {
    title: string;
    icon: IconType;
}

const routeConfig: { [key: string]: RouteConfig } = {
    '/login': { title: 'Login', icon: FaSignInAlt },
    '/register': { title: 'Register', icon: FaUserPlus },
    '/': { title: 'Home', icon: IoHomeOutline },
};

export const getRouteConfig = (pathname: string): RouteConfig => {
    for (const [route, config] of Object.entries(routeConfig)) {
        if (matchPath(route, pathname)) return config;
    }
    return { title: 'Exam Manager', icon: IoHomeOutline };
};

const matchPath = (pattern: string, pathname: string): boolean => {
    const regex = new RegExp(
        '^' + pattern.replace(/:[^\s/]+/g, '([^\\s/]+)') + '$'
    );
    return regex.test(pathname);
};