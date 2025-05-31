import type { IconType } from 'react-icons';
import { FaBook, FaUserPlus, FaSignInAlt, FaRegFolderOpen } from 'react-icons/fa';
import { GrBook } from "react-icons/gr";
import { IoCheckmarkDoneSharp, IoCreateOutline, IoHomeOutline } from 'react-icons/io5';
import { MdOutlineChecklist, MdOutlineCreateNewFolder } from "react-icons/md";
import { PiExamLight } from 'react-icons/pi';
import { TbCategory } from "react-icons/tb";

interface RouteConfig {
    title: string;
    icon: IconType;
}

const routeConfig: { [key: string]: RouteConfig } = {
    '/exercises/new': { title: 'New Exercise', icon: MdOutlineCreateNewFolder  },
    '/exercises': { title: 'Exercises', icon: FaRegFolderOpen },
    '/exercises/:exerciseId': { title: 'Exercise Details', icon: FaBook },
    '/exercises/categories': { title: 'Categories and Types', icon: TbCategory },
    '/exams/new': { title: 'New Exam Setup', icon: IoCreateOutline },
    '/exams/:setupId/generated/:examId': { title: 'Generated Exam Document', icon: FaBook },
    '/exams/:setupId': { title: 'Exam Setup', icon: GrBook },
    '/exams/:setupId/grade': { title: 'Grade Exam', icon: MdOutlineChecklist },
    '/exams/:setupId/grading/:gradingId': { title: 'Exam Grading', icon: IoCheckmarkDoneSharp},
    '/exams': { title: 'All Exam Setups', icon: PiExamLight  },
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