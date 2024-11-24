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
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useAlert } from "@/hooks/useAlert";
import { AlertType } from "@/lib/utils/AlertContextUtils";

const Profile = () => {
    const pb = getPocketBase();
    const userModel = pb.authStore.model;
    const [userObj, setUserObj] = useState<UserRecord | null>(null);
    const [beaconsObj, setBeaconsObj] = useState<ListResult<BeaconRecord> | null>(null);
    const [paymentInfoObj, setPaymentInfoObj] = useState<ListResult<PaymentInfoRecord> | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { showAlert } = useAlert();

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

    const handleDeletePayment = async (id: string) => {
        try {
            await pb.collection('payment_info').delete(id);
            showAlert('Success', "Payment method deleted successfully", { type: AlertType.Success });
            fetchRecords();
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    };

    // Define the form schema
    const formSchema = z.object({
        credit_card_number: z.string().regex(
            /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
            {
                message: "Invalid credit card number.",
            }
        ),
        valid_thru: z.date(),
        cvv: z.string().min(3, {
            message: "CVV must be exactly 3 characters.",
        }).max(3, {
            message: "CVV must be exactly 3 characters.",
        })
    });

    // Define the form resolver
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            credit_card_number: "",
            valid_thru: new Date(),
            cvv: ""
        },
    })


    const createPayment = async (values: z.infer<typeof formSchema>) => {
        try {
            const payload = {
                ...values,
                owner: userModel?.id,
                favorite: false
            };

            await pb.collection('payment_info').create(payload);

            setIsDialogOpen(false);
            showAlert('Success', "Payment method added successfully", { type: AlertType.Success });
            fetchRecords();
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    }

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
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight w-full mt-8">
                                Payment Information
                            </h2>
                            {(paymentInfoObj?.items || []).length > 0 && (
                                <div className="flex justify-end mr-16">
                                    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mt-8"
                                            >
                                                <PlusIcon className="h-4 w-4 mr-2" />
                                                Add Payment Method
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <Form {...form}>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Please fill in the fields.</AlertDialogTitle>
                                                    <AlertDialogDescription asChild>
                                                        <form className="space-y-8 w-full max-w-md">
                                                            <div className="bg-white border rounded-lg px-8 pt-6 pb-8 mb-4 mt-4 flex flex-col border-gray-300">
                                                                <div className='col-span-6'>
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="credit_card_number"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>Credit Card Number</FormLabel>
                                                                                <FormControl>
                                                                                    <Input
                                                                                        className="w-full"
                                                                                        maxLength={19}
                                                                                        placeholder="1234-5678-9012-3456"
                                                                                        {...field}
                                                                                        value={field.value.replace(/(\d{4})(?=\d)/g, '$1-')}
                                                                                        onChange={(e) => {
                                                                                            const value = e.target.value.replace(/\D/g, '');
                                                                                            field.onChange(value);
                                                                                        }}
                                                                                    />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className='col-span-6 mt-4'>
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="valid_thru"
                                                                        render={({ field }) => (
                                                                            <FormItem className="flex flex-col">
                                                                                <FormLabel>Valid Thru</FormLabel>
                                                                                <FormControl>
                                                                                    <Input
                                                                                        type="date"
                                                                                        {...field}
                                                                                        value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(new Date(e.target.value));
                                                                                        }}
                                                                                    />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className='col-span-6 mt-4'>
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="cvv"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>CVV</FormLabel>
                                                                                <FormControl>
                                                                                    <Input placeholder="Type your CVV here ..." {...field} maxLength={3} minLength={3} />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction onClick={form.handleSubmit(createPayment)}>
                                                        Add Payment Method
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </Form>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col ml-16">
                            <div className="flex flex-row gap-4 mt-8 w-full">
                                {paymentInfoObj?.items.map((paymentInfo, index) => (
                                    <div key={index} className="flex flex-col gap-4">
                                        <div className="flex justify-between items-start bg-primary/10 p-4 rounded-2xl shadow-lg relative">
                                            <AlertDialog>
                                                <AlertDialogTrigger className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors duration-300">
                                                    <XIcon className="h-4 w-4" />
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure you want to delete this payment method?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeletePayment(paymentInfo.id)}
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

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
                </div >
            )}
        </>
    );
}

export default Profile;