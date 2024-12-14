import { useAlert } from "@/hooks/useAlert";
import { getPocketBase } from "@/lib/pocketbase";
import { UserRecord } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertType } from "@/lib/utils/AlertContextUtils";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const Profile = () => {
    const pb = getPocketBase();
    const userModel = pb.authStore.model;
    const [userObj, setUserObj] = useState<UserRecord | null>(null);
    const [userAvatarImage, setUserAvatarImage] = useState<string>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

    const { showAlert } = useAlert();

    const generalInformationFormSchema = z.object({
        firstname: z.string().min(2, {
            message: "Firstname must be at least 2 characters.",
        }),
        lastname: z.string().min(2, {
            message: "Lastname must be at least 2 characters.",
        }),
    })

    const generalInformationForm = useForm<z.infer<typeof generalInformationFormSchema>>({
        resolver: zodResolver(generalInformationFormSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
        },
    })

    async function handleGeneralInformationUpdate(values: z.infer<typeof generalInformationFormSchema>) {
        try {
            console.log('values:', values);
        } catch (error) {
            showAlert('Error', "", { type: AlertType.Error });
            return;
        }
    };

    const passwordFormSchema = z.object({
        newPassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
        currentPassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
    })

    const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            newPassword: "",
            currentPassword: "",
        },
    })

    async function handlePasswordUpdate(values: z.infer<typeof passwordFormSchema>) {
        try {
            console.log('values:', values);
        } catch (error) {
            showAlert('Error', "", { type: AlertType.Error });
            return;
        }
    };

    const emailFormSchema = z.object({
        email: z.string().email({
            message: "Invalid email address. Must include '@' and a domain.",
        }),
    })

    const emailForm = useForm<z.infer<typeof emailFormSchema>>({
        resolver: zodResolver(emailFormSchema),
        defaultValues: {
            email: "",
        },
    })

    async function handleEmailUpdate(values: z.infer<typeof emailFormSchema>) {
        try {
            console.log('values:', values);
        } catch (error) {
            showAlert('Error', "", { type: AlertType.Error });
            return;
        }
    };

    const fetchRecords = async () => {
        try {
            const user = await pb.collection('users').getOne<UserRecord>(userModel?.id);
            setUserObj(user);

            const fileToken = await pb.files.getToken();
            const url = pb.files.getUrl(user, user?.avatar, { 'token': fileToken });
            setUserAvatarImage(url);

            generalInformationForm.setValue('firstname', user?.name?.split(' ')[0]);
            generalInformationForm.setValue('lastname', user?.name?.split(' ')[1]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (userModel?.id) {
            fetchRecords();
        }
    }, [userModel?.id]);

    const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file);
    };

    const handleSaveClick = async () => {
        try {
            if (!selectedFile || !userModel) {
                return;
            }

            const formData = new FormData();
            formData.append('avatar', selectedFile);

            await pb.collection('users').update(userModel.id, formData);
            await fetchRecords();

            setSelectedFile(null);
            setIsProfileDialogOpen(false);
            showAlert('Profile Picture Updated', "", { type: AlertType.Success });

        } catch (error) {
            console.error('Error updating profile picture:', error);
            showAlert('Failed to update profile picture', "", { type: AlertType.Error });
            setIsProfileDialogOpen(false);
        }
    };

    return (
        <>
            {userObj && (
                <>
                    <div className="flex flex-col items-start gap-2 border-b pb-5 text-left mb-5">
                        <h2 className="scroll-m-20 text-3xl font-semibold">
                            Profile
                        </h2>
                        <p className="text-gray-500 max-w-2xl">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, minima asperiores? Sapiente, sunt necessitatibus, cumque temporibus molestiae quaerat aperiam laboriosam ipsam doloribus quidem saepe delectus quis magni modi quas earum.
                        </p>
                    </div>
                    <div className="flex border-b pb-5">
                        <div className="w-1/3">
                            <h2 className="scroll-m-20 text-xl font-semibold">
                                Picture
                            </h2>
                            <div className="flex items-center gap-4 mt-5">
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src={userAvatarImage} alt="Avatar" className="w-full h-full object-cover" />
                                    <AvatarFallback className="w-full h-full flex items-center justify-center text-2xl">
                                        {userObj.name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start">
                                    <Dialog
                                        open={isProfileDialogOpen}
                                        onOpenChange={(open) => {
                                            setIsProfileDialogOpen(open);
                                            if (!open) {
                                                setSelectedFile(null);
                                            }
                                        }}
                                    >
                                        <DialogTrigger className="mt-2 underline text-blue-600 hover:text-blue-800">
                                            Edit Picture
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader className="border-b pb-5">
                                                <DialogTitle>Edit Picture</DialogTitle>
                                                <DialogDescription>
                                                    You can upload a new profile picture here.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-row items-center gap-4 mt-5">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={userModel?.avatar ? `${pb.baseUrl}/api/files/${userModel.collectionId}/${userModel.id}/${userModel.avatar}` : "https://github.com/shadcn.png"}
                                                        className='rounded-full'
                                                    />
                                                    <AvatarFallback>{userModel?.name?.charAt(0) || 'U'}</AvatarFallback>
                                                </Avatar>
                                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                                    <Input id="picture" type="file" className="rounded-xl" onChange={handleProfilePictureChange} />
                                                </div>
                                                <Button
                                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl focus:outline-none focus:shadow-outline'
                                                    onClick={handleSaveClick}
                                                >
                                                    Save
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger className="mt-2 underline text-blue-600 hover:text-blue-800">Delete Picture</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will permanently delete your account
                                                    and remove your data from our servers.
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                        <div className="w-2/3">
                            <h2 className="scroll-m-20 text-xl font-semibold">
                                General Information
                            </h2>

                            <Form {...generalInformationForm}>
                                <form onSubmit={generalInformationForm.handleSubmit(handleGeneralInformationUpdate)} className="w-full max-w-lg">
                                    <div className="flex flex-wrap gap-4 mt-5 items-center">
                                        <div className='flex-1'>
                                            <FormField
                                                control={generalInformationForm.control}
                                                name="firstname"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-500">First Name</FormLabel>
                                                        <FormControl>
                                                            <Input className="rounded-xl" placeholder="Type your first name here ..." {...field} />
                                                        </FormControl>
                                                        <div className="h-6">
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <FormField
                                                control={generalInformationForm.control}
                                                name="lastname"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-500">Last Name</FormLabel>
                                                        <FormControl>
                                                            <Input className="rounded-xl" placeholder="Type your last name here ..." {...field} />
                                                        </FormControl>
                                                        <div className="h-6">
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className='flex items-center'>
                                            <Button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl focus:outline-none focus:shadow-outline'>
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                    <div className="flex flex-col mt-5 border-b pb-5">
                        <div className="flex flex-col items-start gap-2 text-left">
                            <h2 className="scroll-m-20 text-3xl font-semibold">
                                Passwords
                            </h2>
                            <p className="text-gray-500 max-w-2xl">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, minima asperiores? Sapiente, sunt necessitatibus, cumque temporibus molestiae quaerat aperiam laboriosam ipsam doloribus quidem saepe delectus quis magni modi quas earum.
                            </p>
                        </div>
                        <Form {...passwordForm}>
                            <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)} className="w-full flex justify-center">
                                <div className="flex flex-wrap gap-8 mt-5 items-center">
                                    <div className='flex-1'>
                                        <FormField
                                            control={passwordForm.control}
                                            name="currentPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-500">Current Password</FormLabel>
                                                    <FormControl>
                                                        <Input className="rounded-xl w-[300px]" placeholder="Type your current password here ..." {...field} />
                                                    </FormControl>
                                                    <div className="h-6">
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <FormField
                                            control={passwordForm.control}
                                            name="newPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-500">New Password</FormLabel>
                                                    <FormControl>
                                                        <Input className="rounded-xl w-[300px]" placeholder="Type your new password here ..." {...field} />
                                                    </FormControl>
                                                    <div className="h-6">
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='flex items-center'>
                                        <Button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl focus:outline-none focus:shadow-outline'>
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                    <div className="flex flex-col mt-5 border-b pb-5">
                        <div className="flex flex-col items-start gap-2 text-left">
                            <h2 className="scroll-m-20 text-3xl font-semibold">
                                Contact Email
                            </h2>
                            <p className="text-gray-500 max-w-2xl">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, minima asperiores? Sapiente, sunt necessitatibus, cumque temporibus molestiae quaerat aperiam laboriosam ipsam doloribus quidem saepe delectus quis magni modi quas earum.
                            </p>
                        </div>
                        <Form {...emailForm}>
                            <form onSubmit={emailForm.handleSubmit(handleEmailUpdate)} className="w-full max-w-lg">
                                <div className="flex flex-wrap gap-4 mt-5 items-center">
                                    <div className='flex-1'>
                                        <FormField
                                            control={emailForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-500">Contact Email</FormLabel>
                                                    <FormControl>
                                                        <Input className="rounded-xl w-[300px]" placeholder="Type your email here ..." {...field} />
                                                    </FormControl>
                                                    <div className="h-6">
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='flex items-center'>
                                        <Button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl focus:outline-none focus:shadow-outline'>
                                            <Plus /> Add Email
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </>
            )}
        </>
    );
}

export default Profile;