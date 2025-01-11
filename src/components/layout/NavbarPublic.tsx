import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { UserRoundPen, Settings, LogOut, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { useLogout } from "@/hooks/useLogout";
import { getPocketBase } from "@/lib/pocketbase";
import { useEffect, useState } from 'react';
import { UserRecord } from '@/types/types';

export const NavbarPublic = ({ title, children }: { title: string; children: React.ReactNode }) => {
	const pb = getPocketBase();
	const userModel = pb.authStore.record;
	const [userAvatarImage, setUserAvatarImage] = useState<string>();
	const [userObj, setUserObj] = useState<UserRecord | null>(null);
	const logout = useLogout();

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
		<div className="p-16">
			<div className="sticky top-5 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center p-8 shadow-lg rounded-2xl">
				<div className="flex items-center">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						{title}
					</h1>
				</div>

				{userObj && (
					<div className="flex items-center gap-4">
						<span className="text-lg font-medium">Hello {userObj.name}!</span>
						<div className="rounded-full bg-primary/10 flex items-center justify-center">
							<Popover>
								<PopoverTrigger asChild>
									<Avatar className="h-12 w-12 cursor-pointer">
										<AvatarImage
											src={userAvatarImage}
											alt="Avatar"
											className="h-full w-full object-cover rounded-full"
										/>
										<AvatarFallback className="w-full h-full flex items-center justify-center text-2xl">
											{userObj.name?.charAt(0) || 'U'}
										</AvatarFallback>
									</Avatar>
								</PopoverTrigger>
								<PopoverContent>
									<div className="grid gap-4">
										<div className="space-y-2">
											<h4 className="font-medium leading-none">{userObj?.name}</h4>
											<p className="text-sm text-muted-foreground">
												{userObj?.email}
											</p>
										</div>
										<div className="grid gap-2">
											<div className="grid grid-cols-1 items-center gap-4">
												<Link to="/profile" className="col-span-2">
													<Button variant="outline" className='w-full'>
														<UserRoundPen /> Profile
													</Button>
												</Link>
												<Link to="/settings" className="col-span-2">
													<Button variant="outline" className='w-full'>
														<Settings /> Settings
													</Button>
												</Link>
												<Button className="col-span-2" variant="destructive" onClick={logout}>
													<LogOut /> Logout
												</Button>
											</div>
										</div>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				) || !userObj && title !== 'Login' && (
					<div className="flex items-center gap-4">
						<Link to="/login" className="col-span-2">
							<Button variant="outline" className='w-full'>
								<LogIn /> Login
							</Button>
						</Link>
					</div>
				)}
			</div>
			<div className="bg-white shadow-xl rounded-2xl p-8 m-8">
				{children}
			</div>
		</div>
	);
};