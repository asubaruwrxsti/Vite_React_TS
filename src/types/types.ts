import { ComponentType } from "react";

export interface Destination {
    name: string;
    code?: string;
    country?: string;
}

export type TravelDetails = {
    from: string;
    to: string;
    departDate: string;
    returnDate: string;
    travelers: number;
};

export interface RouteConfig {
    path: string;
    name: string;
    element: ComponentType;
    protected: boolean;
    icon: ComponentType;
    redirectIfLoggedIn?: boolean;
}