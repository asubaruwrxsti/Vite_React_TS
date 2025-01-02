import { CircleGauge, House, LogIn, UserPen, PictureInPicture2, Radio, AppWindowMac, Bell, KeyRound } from "lucide-react";

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
        description: 'Edit your profile information',
    },
    {
        path: '/subscription',
        name: 'Subscription',
        element: Profile,
        protected: true,
        icon: PictureInPicture2,
        description: 'Manage your subscription',
    },
    {
        path: '/beacons',
        name: 'Beacons',
        element: Profile,
        protected: true,
        icon: Radio,
        description: 'Manage your beacons',
    },
    {
        path: '/app-configuration',
        name: 'App Configuration',
        element: Profile,
        protected: true,
        icon: AppWindowMac,
        description: 'Configure your app',
    },
    {
        path: '/notifications',
        name: 'Notifications',
        element: Profile,
        protected: true,
        icon: Bell,
        description: 'Manage your notifications',
    },
    {
        path: '/privacy',
        name: 'Privacy',
        element: Profile,
        protected: false,
        icon: KeyRound,
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

export const NavAuthRoutes = AppRoutes.filter(route => route.protected);