import { RouteConfig } from "@/types/types";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Checkout from "@/pages/Checkout";
import Login from "@/components/Login";
import Profile from "@/pages/Profile";
import { CircleGauge, House, LogIn, ScanBarcode, UserPen } from "lucide-react";

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
        path: '/checkout',
        name: 'Checkout',
        element: Checkout,
        protected: true,
        icon: ScanBarcode,
    },
    {
        path: '/profile',
        name: 'Profile',
        element: Profile,
        protected: false,
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