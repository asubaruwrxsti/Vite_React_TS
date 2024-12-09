import { useAlert } from "@/hooks/useAlert";
import { getPocketBase } from "@/lib/pocketbase";
import { UserRecord } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
const Profile = () => {
    const pb = getPocketBase();
    const userModel = pb.authStore.model;
    const [userObj, setUserObj] = useState<UserRecord | null>(null);
    const [userAvatarImage, setUserAvatarImage] = useState<string>();
    const { showAlert } = useAlert();

    const fetchRecords = async () => {
        try {
            const user = await pb.collection('users').getOne<UserRecord>(userModel?.id);
            setUserObj(user);

            const fileToken = await pb.files.getToken();
            const url = pb.files.getUrl(user, user?.avatar, { 'token': fileToken });
            setUserAvatarImage(url);
        } catch (error) {
            console.error('Error:', error);
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
                <>
                    <div className="flex flex-col items-start gap-2 border-b pb-2 text-left mb-5">
                        <h2 className="scroll-m-20 text-3xl font-semibold">
                            Profile
                        </h2>
                        <p className="text-gray-500 break-words">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, minima asperiores? Sapiente, sunt necessitatibus, cumque temporibus molestiae quaerat aperiam laboriosam ipsam doloribus quidem saepe delectus quis magni modi quas earum.
                        </p>
                    </div>
                    <div className="flex">
                        <div className="w-1/2">
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
                                    <button className="mt-2 underline text-blue-600 hover:text-blue-800">
                                        Edit Picture
                                    </button>
                                    <button className="mt-2 underline text-blue-600 hover:text-blue-800">
                                        Delete Picture
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <h2 className="scroll-m-20 text-xl font-semibold">
                                Full Name
                            </h2>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Profile;