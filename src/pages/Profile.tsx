import { getPocketBase } from "@/lib/pocketbase";
import { formatDate } from "@/lib/utils";
import { BeaconRecord, PaymentInfoRecord, UserRecord } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { ListResult } from "pocketbase";
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Profile = () => {
    const pb = getPocketBase();
    const userModel = pb.authStore.model;
    const [userObj, setUserObj] = useState<UserRecord | null>(null);
    const [beaconsObj, setBeaconsObj] = useState<ListResult<BeaconRecord> | null>(null);
    const [paymentInfoObj, setPaymentInfoObj] = useState<ListResult<PaymentInfoRecord> | null>(null);

    const fetchRecords = async () => {
        try {
            const user = await pb.collection('users').getOne<UserRecord>(userModel?.id);
            setUserObj(user);

            const beacons = await pb.collection('beacons').getList<BeaconRecord>(1, 10, {
                filter: `owner.id = "${user.id}"`,
                expand: 'owner'
            });
            setBeaconsObj(beacons);

            const paymentInfo = await pb.collection('payment_info').getList<PaymentInfoRecord>(1, 10, {
                filter: `owner.id = "${user.id}"`,
                expand: 'owner'
            });
            setPaymentInfoObj(paymentInfo);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSetFavorite = async (id: string) => {
        try {
            for (const record of paymentInfoObj?.items || []) {
                await pb.collection('payment_info').update(record.id, {
                    favorite: false
                });
            }

            await pb.collection('payment_info').update(id, {
                favorite: true
            });

            fetchRecords();
        } catch (error) {
            console.error('Error setting favorite:', error);
        }
    };

    useEffect(() => {
        if (userModel?.id) {
            fetchRecords();
        }
    }, [userModel?.id]);

    return (
        <>
            {userObj && (
                <div>
                    {/* Personal Information */}
                    <div className="flex items-center">
                        <Avatar>
                            <AvatarImage
                                src={userObj.avatar ? `${pb.baseUrl}/api/files/${userObj.collectionId}/${userObj.id}/${userObj.avatar}` : "https://github.com/shadcn.png"}
                                className='rounded-full w-12 h-12 object-cover mr-5'
                            />
                            <AvatarFallback>{userObj.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 w-full">
                            Personal Information
                        </h2>
                    </div>
                    <div className="flex flex-col ml-16">
                        <div className="grid grid-cols-1 gap-4 mt-4">
                            <div className="grid grid-cols-2 gap-4 items-center border-b pb-2">
                                <Label className="text-lg font-medium">Full Name</Label>
                                <span className="text-lg">{userObj.name} {userObj.surname}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 items-center border-b pb-2">
                                <Label className="text-lg font-medium">Email</Label>
                                <span className="text-lg">{userObj.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Beacon Information */}
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight w-full mt-8">
                        Registered Beacons
                    </h2>
                    <div className="flex flex-col ml-16">
                        <div className="grid grid-cols-1 gap-4 mt-8">
                            {beaconsObj?.items.map((beacon, index) => (
                                <div key={index} className="grid grid-cols-1 gap-4 items-center">
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value={index.toString()}>
                                            <AccordionTrigger>
                                                <div className="flex justify-between items-center w-full mr-12">
                                                    <Label className="text-lg font-medium">Beacon {index + 1}</Label>
                                                    <div className={`flex items-center rounded-lg px-4 ${beacon.active ? 'bg-green-100' : 'bg-red-100'}`}>
                                                        <span className="text-lg">{beacon.name}</span>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="bg-primary/10 p-4 rounded-lg">
                                                    <div className="grid grid-cols-2 gap-4 items-center">
                                                        <Label className="text-lg font-medium">Last Seen</Label>
                                                        <span className="text-lg">{beacon.last_seen ? formatDate(beacon.last_seen) : 'Never'}</span>

                                                        <Label className="text-lg font-medium">Active</Label>
                                                        <span className="text-lg">{beacon.active ? 'Yes' : 'No'}</span>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Information */}
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight w-full mt-8">
                        Payment Information
                    </h2>
                    <div className="flex flex-col ml-16">
                        <div className="flex flex-row gap-4 mt-8 w-full">
                            {paymentInfoObj?.items.map((paymentInfo, index) => (
                                <div key={index} className="flex flex-col gap-4">
                                    <div className="flex justify-between items-start bg-primary/10 p-4 rounded-2xl shadow-lg">
                                        <div className="flex justify-between flex-1">
                                            <div className="flex flex-col gap-4">
                                                <Label className="text-lg font-medium">Credit Card Number</Label>
                                                <Label className="text-lg font-medium">Valid Thru</Label>
                                            </div>
                                            <div className="flex flex-col gap-4 ml-8">
                                                <span className="text-lg text-right">
                                                    {paymentInfo.credit_card_number
                                                        ? '**** **** **** ' + paymentInfo.credit_card_number.slice(-4)
                                                        : 'No card on file'
                                                    }
                                                </span>
                                                <span className="text-lg text-right">{formatDate(paymentInfo.valid_thru)}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-end ml-8">
                                            {paymentInfo.favorite ? (
                                                <Badge variant="default">
                                                    Favorite
                                                </Badge>
                                            ) : (
                                                <Link to="#" onClick={() => handleSetFavorite(paymentInfo.id)}>
                                                    <Badge variant="secondary" className="cursor-pointer">
                                                        Set Favorite
                                                    </Badge>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;