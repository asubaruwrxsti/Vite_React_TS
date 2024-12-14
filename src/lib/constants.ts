import { RouteConfig } from "@/types/types";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Login from "@/components/Login";
import Profile from "@/pages/Profile";
import { CircleGauge, House, LogIn, UserPen } from "lucide-react";

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