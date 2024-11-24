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

export interface UserRecord {
    avatar: string;
    collectionId: string;
    collectionName: string;
    created: string;
    email: string;
    emailVisibility: boolean;
    id: string;
    name: string;
    surname: string;
    updated: string;
    username: string;
    verified: boolean;
};

export interface BeaconRecord {
    name: string;
    active: boolean;
    last_seen: string;
    owner: string;
};

export interface PaymentInfoRecord {
    id: string;
    credit_card_number: string;
    valid_thru: string;
    owner: string;
    cvv: string;
    favorite: boolean;
}
