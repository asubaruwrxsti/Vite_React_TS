import { CircleGauge, House, LogIn, UserPen } from "lucide-react";

import Login from "@/components/Login";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import { RouteConfig } from "@/types/types";


export const DEFAULT_TIMEOUT = 3000;
export const CURRENCY = 'ALL';

export const AppRoutes: RouteConfig[] = [
    {
        path: '/',
        name: 'Home',
        element: Home,
        protected: false,
        icon: House,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        element: Dashboard,
        protected: true,
        icon: CircleGauge,
    },
    {
        path: '/profile',
        name: 'Profile',
        element: Profile,
        protected: true,
        icon: UserPen,
    },
    {
        path: '/login',
        name: 'Login',
        element: Login,
        protected: false,
        redirectIfLoggedIn: true,
        icon: LogIn,
    }
];